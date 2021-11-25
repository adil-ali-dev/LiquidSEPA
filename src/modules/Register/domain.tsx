import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Props } from './typedef';
import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { useSessionContext } from '../../contexts/Session';
import { useAuthEidLogin, useAuthEidSignup } from '../../graphql/Session/hooks';
import { SuccessAlertModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';


export const withLoginDomain = (Component: FC<Props>) => () => {
  const [error, setError] = useState<null | string>(null);

  // TODO: add create() call on success
  const authEid = useAuthEidSignup(() => {});

  const { status, create, statusRegisterModal, controls } = useSessionContext();


  useEffect(() => {
    if (statusRegisterModal) {
      authEid.authEidSignup();
    } else {
      authEid.stopPolling?.();
    }
  }, [statusRegisterModal]);

  useEffect(() => {
    if (!authEid.error) return;

    setError(authEid.error);
  }, [authEid.error]);

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
        handleClose={ handleErrorClose }
        handleButtonClick={ handleErrorClose }
      />
    </>

  );
};
