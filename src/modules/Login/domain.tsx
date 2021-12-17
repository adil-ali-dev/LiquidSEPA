import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { Props } from './typedef';
import { sessionActions, sessionCreateLoadingSelector, sessionRequestIdSelector, sessionWaitingForSignatureSelector } from '../../store/Session';
import { useSessionContext } from '../../contexts/Session';


export const withLoginDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();

  const { status, statusLoginModal, controls } = useSessionContext();

  const requestId = useSelector(sessionRequestIdSelector);
  const loadingCreateSession = useSelector(sessionCreateLoadingSelector);
  const waitingForSignature = useSelector(sessionWaitingForSignatureSelector);

  useEffect(() => {
    if (!statusLoginModal) return;

    dispatch(sessionActions.createSession());
  }, [statusLoginModal]);

  useEffect(() => {
    if (loadingCreateSession) return;

    controls.closeLogin();
  }, [loadingCreateSession]);

  const handleClose = useCallback(() => {
    controls.closeLogin();
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
      status={ statusLoginModal }
      handleClose={ handleClose }
      loading={ loading || status }
      qrValue={ qrValue }
    />
  );
};
