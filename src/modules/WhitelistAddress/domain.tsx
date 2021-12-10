import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';

import { WrappedProps } from './typedef';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useAddressesValidation, useWhitelistedAddress } from '../../graphql/WhitelistAddress/hooks';
import { useAuthEidCancel } from '../../graphql/AuthEidCancel/hooks';
import { StatusModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';
import { useDebounce } from '../../hooks/Debounce';


export const withWhitelistAddressDomain = (Component: FC<WrappedProps>) => () => {
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const debouncedAddress = useDebounce(address);

  const { validate, valid } = useAddressesValidation();
  const { cancel } = useAuthEidCancel();
  const { modalStatus, success, error, controls } = useWhitelistAddressContext();
  const { loading, waiting, whitelistAddress, requestId } = useWhitelistedAddress(controls.openStatus);

  useEffect(() => {
    if (modalStatus) return;

    cancel(requestId);
    setLabel('');
    setAddress('');
  }, [modalStatus]);

  useEffect(() => {
    validate(debouncedAddress);
  }, [debouncedAddress]);

  const handleLabelChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setLabel(currentTarget.value);
  }, []);

  const handleAddressChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setAddress(currentTarget.value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    whitelistAddress({ label, address })
  }, [label, address]);

  return (
    <>
      <Component
        status={ modalStatus }
        handleClose={ controls.close }
        label={ label }
        disabled={ !label || !address || !valid }
        addressValid={ valid }
        address={ address }
        loading={ loading || waiting }
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
