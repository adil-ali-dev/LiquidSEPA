import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './typedef';
import { sessionActions, sessionCreateLoadingSelector, sessionLoginUrlSelector, sessionLoginRequestIdSelector, sessionWaitingForSignatureSelector } from '../../store/Session';
import { useSessionContext } from '../../contexts/Session';


export const withLoginDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();

  const { status, statusLoginModal, controls } = useSessionContext();

  const loginUrl = useSelector(sessionLoginUrlSelector);
  const requestId = useSelector(sessionLoginRequestIdSelector);
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

  const loading = useMemo(() => {
    return waitingForSignature || (loadingCreateSession && !loginUrl);
  }, [loadingCreateSession, waitingForSignature, loginUrl]);

  const handleClose = useCallback(() => {
    controls.closeLogin();
  }, []);

  const handleExited = useCallback(() => {
    if (!requestId) return;

    dispatch(sessionActions.cancelAuthEid({ requestId }));
  }, [requestId]);

  return (
    <Component
      status={ statusLoginModal }
      loading={ loading || status }
      qrValue={ loginUrl }
      handleClose={ handleClose }
      handleExited={ handleExited }
    />
  );
};
