import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  AUTH_EID_SIGNUP,
  AUTH_EID_LOGIN,
  FETCH_AUTH_EID_SIGNUP_STATUS,
  FETCH_AUTH_EID_LOGIN_STATUS,
  SESSION_STATUS,
  LOGOUT
} from './queries';
import { AuthEidSignupData, AuthEidAuthorizeData, AuthEidStatusVariables, AuthEidSignupStatusData, UserSessionData, AuthEidAuthorizeStatusData } from './typedef';
import { useSessionContext } from '../../contexts/Session';
import { authEidStatusHandler } from '../auth-eid-handler';

const POLL_INTERVAL = 1000;

export const useAuthEidSignup = (cb: () => void) => {
  const [requestAuthEidReg, signupData] = useMutation<AuthEidSignupData>(AUTH_EID_SIGNUP);
  const [fetchStatus, statusData] = useLazyQuery<AuthEidSignupStatusData, AuthEidStatusVariables>(FETCH_AUTH_EID_SIGNUP_STATUS, {
    pollInterval: POLL_INTERVAL
  });

  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const requestId = signupData.data?.authEidSignup.requestId;

    if (!requestId) return;

    error &&  setError(null);
    fetchStatus({ variables: { requestId } });
  }, [signupData.data?.authEidSignup.requestId]);

  useEffect(() => {
    if (!signupData.error) return;

    setWaiting(false);
    setError(signupData.error.message);
  }, [signupData.error]);

  useEffect(() => {
    if (waiting) return;

    statusData.stopPolling?.();
  }, [waiting]);

  useEffect(() => {
    const status = statusData.data?.authEidSignupStatus.status;
    if (!status) return;

    const success = () => {
      waiting && setWaiting(false);
      cb();
    };

    const wait = () => {
      setWaiting(true);
    };

    const failure = (errorMsg?: string) => {
      waiting && setWaiting(false);
      errorMsg && setError(errorMsg);
    };

    authEidStatusHandler(status, [success, wait, failure]);
  }, [statusData.data?.authEidSignupStatus.status]);

  const authEidSignup = () => {
    // eslint-disable-next-line no-console
    requestAuthEidReg().catch(e => console.log(e));
  };

  return {
    ...signupData,
    data: signupData.data?.authEidSignup,
    stopPolling: statusData.stopPolling,
    requestId: error ? null : signupData.data?.authEidSignup.requestId,
    waiting,
    error,
    authEidSignup
  };
};

export const useAuthEidLogin = (cb: () => void) => {
  const [requestAuthEidAuth, authData] = useMutation<AuthEidAuthorizeData>(AUTH_EID_LOGIN, { fetchPolicy: 'no-cache' });
  const [fetchStatus, statusData] = useLazyQuery<AuthEidAuthorizeStatusData, AuthEidStatusVariables>(FETCH_AUTH_EID_LOGIN_STATUS, {
    pollInterval: POLL_INTERVAL
  });

  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const { create } = useSessionContext();

  useEffect(() => {
    if (!authData.data?.authEidAuthorize.requestId) return;

    setWaiting(true);
    fetchStatus({ variables: { requestId: authData.data?.authEidAuthorize.requestId } });
  }, [authData.data?.authEidAuthorize.requestId]);

  useEffect(() => {
    if (!authData.error) return;

    setWaiting(false);
    setError(authData.error.message);
  }, [authData.error]);

  useEffect(() => {
    if (waiting) return;

    statusData.stopPolling?.();
  }, [waiting]);

  useEffect(() => {
    const status = statusData.data?.authEidAuthorizeStatus.status;
    if (!status) return;

    const success = () => {
      waiting && setWaiting(false);
      cb();
    };

    const wait = () => {
      setWaiting(true);
    };

    const failure = (errorMsg?: string) => {
      waiting && setWaiting(false);
      errorMsg && setError(errorMsg);
    };

    authEidStatusHandler(status, [success, wait, failure]);
  }, [statusData.data?.authEidAuthorizeStatus.status]);

  const authEidLogin = () => {
    // eslint-disable-next-line no-console
    requestAuthEidAuth().catch(e => console.log(e));
  };

  return {
    ...authData,
    stopPolling: statusData.stopPolling,
    data: authData.data?.authEidAuthorize,
    requestId: error ? null : authData.data?.authEidAuthorize.requestId,
    waiting,
    error,
    authEidLogin
  };
};

export const useSessionStatus = () => {
  const [requestSessionStatus, { data, error, loading }] = useMutation<UserSessionData>(SESSION_STATUS);
  const [logoutReq] = useMutation(LOGOUT);

  useEffect(() => {
    // eslint-disable-next-line no-console
    requestSessionStatus().catch(e => console.log(e));
  }, []);

  return {
    status: data?.userSession.hasSession,
    error: !!error,
    loading,
    logout: logoutReq
  };
};
