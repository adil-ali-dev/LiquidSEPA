import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { Props } from './typedef';
import { useAuthEidLogin } from '../../graphql/Session/hooks';
import { useAuthEidCancel } from '../../graphql/AuthEidCancel/hooks';
import { useSessionContext } from '../../contexts/Session';
import { SuccessAlertModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';


export const withLoginDomain = (Component: FC<Props>) => () => {
  const [error, setError] = useState<null | string>(null);
  const [registerNext, setRegisterNext] = useState(false);

  const authEid = useAuthEidLogin((error?: string, register?: boolean) => authEidCallback(error, register));
  const authEidCancel = useAuthEidCancel();

  const { status, create, statusLoginModal, controls } = useSessionContext();

  useEffect(() => {
    if (statusLoginModal) {
      authEid.authEidLogin();
    } else {
      authEidCancel.cancel(authEid.requestId);
      authEid.stopPolling?.();
    }
  }, [statusLoginModal]);

  useEffect(() => {
    if (!error) return;

    controls.closeLogin();
  }, [error]);

  const qrValue = useMemo(() => {
    if (!authEid.requestId) return null;

    return `${ AUTH_EID_URL_REQ_PREFIX }${ authEid.requestId }`;
  }, [authEid.requestId]);

  const handleErrorClose = useCallback(() => {
    setError(null);
    setRegisterNext(false);
  }, []);

  const handleButtonClick = useCallback(() => {
    registerNext && controls.openRegister();
    handleErrorClose();
  }, [registerNext]); 

  const authEidCallback = useCallback((error?: string, register?: boolean) => {
    if (!error) {
      create();
    } else {
      setError(error);
      register && setRegisterNext(true);
    }
  }, []);

  return (
    <>
      <Component
        status={ statusLoginModal }
        handleClose={ controls.closeLogin }
        loading={ authEid.loading || authEid.waiting || status }
        qrValue={ qrValue }
      />
      <SuccessAlertModal
        text={ error }
        type={ StatusModalType.ERROR }
        status={ !!error }
        btnText={ registerNext ? 'Register' : 'OK' }
        handleClose={ handleErrorClose }
        handleButtonClick={ handleButtonClick }
      />
    </>

  );
};
