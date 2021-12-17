import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './typedef';
import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { useSessionContext } from '../../contexts/Session';
import { sessionActions, sessionCreateAccountErrorSelector, sessionCreateAccountLoadingSelector, sessionRequestIdSelector, sessionWaitingForSignatureSelector } from '../../store/Session';


export const withRegisterDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();

  const { status, statusRegisterModal, controls } = useSessionContext();

  const requestId = useSelector(sessionRequestIdSelector);
  const loadingCreateSession = useSelector(sessionCreateAccountLoadingSelector);
  const waitingForSignature = useSelector(sessionWaitingForSignatureSelector);

  useEffect(() => {
    if (!statusRegisterModal) return;

    dispatch(sessionActions.createAccount());
  }, [statusRegisterModal]);

  useEffect(() => {
    if (loadingCreateSession) return;

    controls.closeRegister();
  }, [loadingCreateSession]);

  const handleClose = useCallback(() => {
    controls.closeRegister();
  }, [requestId]);

  const loading = useMemo(() => {
    return waitingForSignature || (loadingCreateSession && !requestId);
  }, [loadingCreateSession, waitingForSignature, requestId]);

  const qrValue = useMemo(() => {
    if (!requestId) return null;

    return `${ AUTH_EID_URL_REQ_PREFIX }${ requestId }`;
  }, [requestId]);

  return (
    <Component
      status={ statusRegisterModal }
      handleClose={ handleClose }
      loading={ loading || status }
      qrValue={ qrValue }
    />
  );
};
