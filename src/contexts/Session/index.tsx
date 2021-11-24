import React, { createContext, FC, ReactNode, useState, useContext, useEffect } from 'react';

import { useAuthEidLogin, useAuthEidSignup, useSessionStatus } from '../../graphql/Session/hooks';

const SessionContext = createContext({
  status: false,
  loading: false,
  qrLoading: false,
  error: false,
  qrError: null,
  modalType: null,
  requestId: null as null | string,
  qrWaiting: false,
  qrData: undefined,
  create: (): void => {},
  destroy: (): void => {},
  controls: {
    openLogin: (): void => {},
    closeLogin: (): void => {},
    openRegister: (): void => {},
    closeRegister: (): void => {}
  }
});

type Props = {
  children: ReactNode;
};

export const SessionProvider: FC<Props> = ({ children }) => {
  const sessionStatus = useSessionStatus();
  const registerData = useAuthEidSignup(() => closeRegister());
  const loginData = useAuthEidLogin(() => create());

  const [modalType, setModalType] = useState<'register' | 'login' | null>(null);
  const [status, setStatus] = useState(false);
  const [requestId, setRequestId] = useState<null | string>(null);

  const isRegister = modalType === 'register';
  const qrLoading = isRegister ? registerData.loading : loginData.loading;
  const qrWaiting = isRegister ? registerData.waiting : loginData.waiting;
  const qrData = (isRegister ? registerData.data : loginData.data) || null;
  const qrError = (isRegister ? registerData.error : loginData.error) || null;

  useEffect(() => {
    setRequestId(loginData.data?.requestId || null);
  }, [loginData.data?.requestId]);

  useEffect(() => {
    setRequestId(registerData.data?.requestId || null);
  }, [registerData.data?.requestId]);

  useEffect(() => {
    if (sessionStatus.status === status) return;

    setStatus(sessionStatus.status || false);
  }, [sessionStatus.status]);

  useEffect(() => {
    if (!qrError) return;

    setRequestId(null);
  }, [qrError]);

  useEffect(() => {
    if (modalType) return;

    loginData.stopPolling?.();
    registerData.stopPolling?.();
  }, [modalType]);

  const create = () => {
    setStatus(true);
    setModalType(null);
  };

  const destroy = () => {
    setStatus(false);
    sessionStatus.logout();
  };

  const openLogin = () => {
    setModalType('login');
    loginData.authEidLogin();
  };

  const closeLogin = () => {
    setModalType(null);
  };

  const openRegister = () => {
    setModalType('register');
    registerData.authEidSignup();
  };

  const closeRegister = () => {
    setModalType(null);
  };

  const value = {
    status,
    modalType,
    loading: sessionStatus.loading,
    error: sessionStatus.error,
    create,
    destroy,
    qrError,
    qrData,
    qrLoading,
    qrWaiting,
    requestId,
    controls: {
      openLogin,
      closeLogin,
      openRegister,
      closeRegister
    }
  };

  return (
    // @ts-ignore
    <SessionContext.Provider value={ value }>
      { children }
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
export const SessionConsumer = SessionContext.Consumer;
