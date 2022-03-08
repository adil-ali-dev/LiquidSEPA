import React, { ChangeEvent, FC, FormEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StatusModalType } from '../../typedef';
import { WrappedProps } from './typedef';
import { addressesActions, addressesAddressValidSelector, addressesItemsLoadingSelector, addressesItemsSelector, addressesWhitelistAddressErrorSelector, addressesWhitelistAddressLoadingSelector, addressesWhitelistingRequestIdSelector } from '../../store/Addresses';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useDebounce } from '../../hooks/Debounce';
import { usePrevious } from '../../hooks/Previous';
import { StatusModal } from '../../components/StatusModal';
import { useWelcomeContext } from '../../contexts/Welcome';
import { useBankAccountContext } from '../../contexts/BankAccount';


export const withWhitelistAddressDomain = (Component: FC<WrappedProps>) => () => {
  const dispatch = useDispatch();

  const { modalStatus, controls } = useWhitelistAddressContext();
  const { controls: bankAccountsModalControls } = useBankAccountContext();

  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const debouncedAddress = useDebounce(address);

  const addresses = useSelector(addressesItemsSelector);
  const addressesLoading = useSelector(addressesItemsLoadingSelector);
  const valid = useSelector(addressesAddressValidSelector);
  const loading = useSelector(addressesWhitelistAddressLoadingSelector);
  const error = useSelector(addressesWhitelistAddressErrorSelector);
  const requestId = useSelector(addressesWhitelistingRequestIdSelector);

  const debouncedAddressPrev = usePrevious(debouncedAddress);

  const inputRequired = useMemo(() => {
    return !addressesLoading && !addresses.length;
  }, [addressesLoading]);

  useEffect(() => {
    if (!address || error || !loading) return;

    controls.close();
  }, [loading]);

  useEffect(() => {
    if ((!debouncedAddress && !debouncedAddressPrev) || loading || !address) return;

    dispatch(addressesActions.validateAddress({ address: debouncedAddress }));
  }, [debouncedAddress]);

  const handleLabelChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setLabel(currentTarget.value);
  }, []);

  const handleAddressChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setAddress(currentTarget.value.trim());
  }, []);

  const handleSubmit = useCallback((event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!valid) return;

    dispatch(addressesActions.whitelistAddress({
      label,
      address,
      ...(inputRequired ? { closeCb: bankAccountsModalControls.open } : {}),
      ...(error ? { closeCb: controls.open } : {})
    }));
  }, [label, address, valid, inputRequired, error]);

  const handleCancel = useCallback(() => {
    controls.close();
    if (!requestId) return;

    dispatch(addressesActions.cancelWhitelisting({ requestId }))
  }, [requestId]);

  const handleAddressKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code !== 'Enter') return;

    handleSubmit();
  }, [valid, addresses, label, inputRequired, error]);

  const handleExited = useCallback(() => {
    setLabel('');
    setAddress('');
  }, []);

  return (
    <>
      <Component
        status={ modalStatus }
        handleClose={ inputRequired ? undefined : controls.close }
        label={ label }
        disabled={ !label || !address || !valid }
        addressValid={ valid }
        address={ address }
        loading={ loading }
        handleAddressKeyDown={ handleAddressKeyDown }
        handleLabelChange={ handleLabelChange }
        handleAddressChange={ handleAddressChange }
        handleSubmit={ handleSubmit }
        handleExited={ handleExited }
      />
      <StatusModal
        type={ StatusModalType.PROCESSING }
        processingText="Waiting for Auth eID sign"
        status={ loading }
        handleClose={ inputRequired ? undefined : handleCancel }
      />
    </>
  );
};
