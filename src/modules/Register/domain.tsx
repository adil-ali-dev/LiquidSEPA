import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Props } from './typedef';
import { AUTH_EID_URL_REQ_PREFIX } from '../../constants';
import { useSessionContext } from '../../contexts/Session';
import { StatusModal } from '../../components/StatusModal';
import { StatusModalType } from '../../components/StatusModal/typedef';
import { useAuthEidCancel } from '../../graphql/AuthEidCancel/hooks';
import { sessionActions, sessionCreateAccountLoadingSelector, sessionRequestIdSelector, sessionWaitingForSignatureSelector } from '../../store/Session';


export const withRegisterDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();

  const { status, statusRegisterModal, controls } = useSessionContext();

  const requestId = useSelector(sessionRequestIdSelector);
  const loadingCreateSession = useSelector(sessionCreateAccountLoadingSelector);
  const waitingForSignature = useSelector(sessionWaitingForSignatureSelector);

  const authEidCancel = useAuthEidCancel();

  useEffect(() => {
    if (!statusRegisterModal) return;

    dispatch(sessionActions.createAccount());
  }, [statusRegisterModal]);

  const handleClose = useCallback(() => {
    controls.closeLogin();
    authEidCancel.cancel(requestId!);
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
