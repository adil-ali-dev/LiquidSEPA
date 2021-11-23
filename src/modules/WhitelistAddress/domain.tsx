import React, { ChangeEvent, FC, FormEvent, useCallback, useDebugValue, useState } from 'react';
import { Props } from './typedef';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';
import { useWhitelistedAddress } from '../../graphql/WhitelistAddress/hooks';


export const withWhitelistAddressDomain = (Component: FC<Props>) => () => {
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);

  const { loading, waiting, whitelistAddress } = useWhitelistedAddress(() => addressWhitelistedCallback());

  const { modalStatus, controls } = useWhitelistAddressContext();

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

  const addressWhitelistedCallback = useCallback(() => {
    setSuccess(true);
  }, []);

  return (
    <Component
      status={ modalStatus }
      handleClose={ controls.close }
      label={ label }
      success={ success }
      disabled={ !label || !address }
      address={ address }
      loading={ loading || waiting }
      handleLabelChange={ handleLabelChange }
      handleAddressChange={ handleAddressChange }
      handleSubmit={ handleSubmit }
    />
  );
};
