import React, { createContext, FC, ReactNode, useState, useContext, useEffect } from 'react';

import { useAuthEidLogin, useAuthEidSignup, useSessionStatus } from '../../graphql/Session/hooks';

const SessionContext = createContext({
  status: false,
  loading: false,
  error: false,
  statusLoginModal: false,
  statusRegisterModal: false,
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

  const [status, setStatus] = useState(false);
  const [statusLoginModal, setStatusLoginModal] = useState(false);
  const [statusRegisterModal, setStatusRegisterModal] = useState(false);

  useEffect(() => {
    setStatus(sessionStatus.status || false);
  }, [sessionStatus.status])

  const create = () => {
    setStatus(true);
    setStatusLoginModal(false);
    setStatusRegisterModal(false);
  };

  const destroy = () => {
    setStatus(false);
    sessionStatus.logout();
  };

  const openLogin = () => {
    setStatusLoginModal(true);
  };

  const closeLogin = () => {
    setStatusLoginModal(false);
  };

  const openRegister = () => {
    setStatusRegisterModal(true);
  };

  const closeRegister = () => {
    setStatusRegisterModal(false);
  };

  const value = {
    status,
    statusLoginModal,
    statusRegisterModal,
    loading: sessionStatus.loading,
    error: sessionStatus.error,
    create,
    destroy,
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
