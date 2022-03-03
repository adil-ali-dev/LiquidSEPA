import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StatusModalType } from '../../typedef';
import { WrappedProps } from './typedef';
import { addressesActions, addressesAddressValidSelector, addressesItemsLoadingSelector, addressesItemsSelector, addressesWhitelistAddressErrorSelector, addressesWhitelistAddressLoadingSelector } from '../../store/Addresses';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useDebounce } from '../../hooks/Debounce';
import { usePrevious } from '../../hooks/Previous';
import { StatusModal } from '../../components/StatusModal';


export const withWhitelistAddressDomain = (Component: FC<WrappedProps>) => () => {
  const dispatch = useDispatch();

  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const debouncedAddress = useDebounce(address);
  const { modalStatus, controls } = useWhitelistAddressContext();

  const debouncedAddressPrev = usePrevious(debouncedAddress);

  const addresses = useSelector(addressesItemsSelector);
  const addressesLoading = useSelector(addressesItemsLoadingSelector);
  const valid = useSelector(addressesAddressValidSelector);
  const loading = useSelector(addressesWhitelistAddressLoadingSelector);
  const error = useSelector(addressesWhitelistAddressErrorSelector);

  const inputRequired = useMemo(() => !addressesLoading && !addresses.length, [addressesLoading]);

  useEffect(() => {
    if (modalStatus) return;

    setLabel('');
    setAddress('');
  }, [modalStatus]);

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
    setAddress(currentTarget.value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid) return;

    dispatch(addressesActions.whitelistAddress({ label, address }));
  }, [label, address, valid]);

  return (
    <>
      <Component
        status={ inputRequired || modalStatus }
        handleClose={ inputRequired ? undefined : controls.close }
        label={ label }
        disabled={ !label || !address || !valid }
        addressValid={ valid }
        address={ address }
        loading={ loading }
        handleLabelChange={ handleLabelChange }
        handleAddressChange={ handleAddressChange }
        handleSubmit={ handleSubmit }
      />
      <StatusModal
        type={ StatusModalType.PROCESSING }
        processingText="Waiting for Auth eID sign"
        status={ loading }
      />
    </>

  );
};
