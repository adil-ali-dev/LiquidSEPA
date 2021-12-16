import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WrappedProps } from './typedef';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useAuthEidCancel } from '../../graphql/AuthEidCancel/hooks';
import { StatusModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';
import { useDebounce } from '../../hooks/Debounce';
import { addressesActions, addressesAddressValidSelector, addressesWhitelistAddressErrorSelector, addressesWhitelistAddressLoadingSelector } from '../../store/Addresses';
import { usePrevious } from '../../hooks/Previous';


export const withWhitelistAddressDomain = (Component: FC<WrappedProps>) => () => {
  const dispatch = useDispatch();

  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const debouncedAddress = useDebounce(address);

  const { cancel } = useAuthEidCancel();
  const { modalStatus, success, controls } = useWhitelistAddressContext();

  const debouncedAddressPrev = usePrevious(debouncedAddress);

  const valid = useSelector(addressesAddressValidSelector);
  const loading = useSelector(addressesWhitelistAddressLoadingSelector);
  const error = useSelector(addressesWhitelistAddressErrorSelector);

  useEffect(() => {
    if (modalStatus) return;

    // cancel(requestId);
    setLabel('');
    setAddress('');
  }, [modalStatus]);

  useEffect(() => {
    if (loading || !address || error) return;

    controls.close();
  }, [loading])

  useEffect(() => {
    if (!debouncedAddress && !debouncedAddressPrev) return;

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
        status={ modalStatus }
        handleClose={ controls.close }
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
        text="Address successfully whitelisted"
        type={ StatusModalType.SUCCESS }
        status={ success }
        handleClose={ controls.closeStatus }
        handleButtonClick={ controls.closeStatus }
      />
      <StatusModal
        text={ error }
        type={ StatusModalType.ERROR }
        status={ !!error }
        handleClose={ controls.closeStatus }
        handleButtonClick={ controls.closeStatus }
      />
    </>

  );
};
