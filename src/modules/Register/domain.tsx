import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Props } from './typedef';
import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { useSessionContext } from '../../contexts/Session';
import { useAuthEidSignup } from '../../graphql/Session/hooks';
import { SuccessAlertModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';


export const withRegisterDomain = (Component: FC<Props>) => () => {
  const [error, setError] = useState<null | string>(null);
  const [loginNext, setLoginNext] = useState(false);

  const authEid = useAuthEidSignup((error?: string, login?: boolean) => authEidCallback(error, login));

  const { status, create, statusRegisterModal, controls } = useSessionContext();


  useEffect(() => {
    if (statusRegisterModal) {
      authEid.authEidSignup();
    } else {
      authEid.stopPolling?.();
    }
  }, [statusRegisterModal]);

  useEffect(() => {
    if (!error) return;

    controls.closeRegister();
  }, [error]);

  const qrValue = useMemo(() => {
    if (!authEid.requestId) return null;

    return `${ AUTH_EID_URL_REQ_PREFIX }${ authEid.requestId }`;
  }, [authEid.requestId]);

  const handleErrorClose = useCallback(() => {
    setError(null);
    setLoginNext(false);
  }, []);

  const handleButtonClick = useCallback(() => {
    loginNext && controls.openLogin();
    handleErrorClose();
  }, [loginNext]); 

  const authEidCallback = useCallback((error?: string, login?: boolean) => {
    if (error) {
      setError(error);
      login && setLoginNext(true);
    }
  }, []);

  return (
    <>
      <Component
        status={ statusRegisterModal }
        handleClose={ controls.closeRegister }
        loading={ authEid.loading || authEid.waiting || status }
        qrValue={ qrValue }
      />
      <SuccessAlertModal
        text={ error }
        type={ StatusModalType.ERROR }
        status={ !!error }
        btnText={ loginNext ? 'Login' : 'OK' }
        handleClose={ handleErrorClose }
        handleButtonClick={ handleButtonClick }
      />
    </>

  );
};
