import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './typedef';
import {
  sessionActions,
  sessionCreateAccountLoadingSelector,
  sessionRegisterUrlSelector,
  sessionRegisterRequestIdSelector,
  sessionWaitingForSignatureSelector
} from '../../store/Session';
import { useSessionContext } from '../../contexts/Session';


export const withRegisterDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();

  const { status, statusRegisterModal, controls } = useSessionContext();

  const registerUrl = useSelector(sessionRegisterUrlSelector);
  const requestId = useSelector(sessionRegisterRequestIdSelector);
  const loadingCreateAccount = useSelector(sessionCreateAccountLoadingSelector);
  const waitingForSignature = useSelector(sessionWaitingForSignatureSelector);

  useEffect(() => {
    if (!statusRegisterModal) return;

    dispatch(sessionActions.createAccount());
  }, [statusRegisterModal]);

  useEffect(() => {
    if (loadingCreateAccount) return;

    controls.closeRegister();
  }, [loadingCreateAccount]);

  const loading = useMemo(() => {
    return waitingForSignature || (loadingCreateAccount && !registerUrl);
  }, [loadingCreateAccount, waitingForSignature, registerUrl]);

  const handleClose = useCallback(() => {
    controls.closeRegister();
  }, []);

  const handleExited = useCallback(() => {
    if (!requestId) return;

    dispatch(sessionActions.cancelAuthEid({ requestId }));
  }, [requestId]);

  return (
    <Component
      status={ statusRegisterModal }
      loading={ loading || status }
      qrValue={ registerUrl }
      handleClose={ handleClose }
      handleExited={ handleExited }
    />
  );
};
