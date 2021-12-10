import React, { createContext, FC, ReactNode, useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionActions, sessionStatusSelector } from '../../store/Session';


const SessionContext = createContext({
  status: false,
  loading: false,
  statusLoginModal: false,
  statusRegisterModal: false,
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
  const dispatch = useDispatch();

  const status = useSelector(sessionStatusSelector);
  const [statusLoginModal, setStatusLoginModal] = useState(false);
  const [statusRegisterModal, setStatusRegisterModal] = useState(false);

  const destroy = () => {
    dispatch(sessionActions.destroy());
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
    status: !!status,
    statusLoginModal,
    statusRegisterModal,
    loading: status === null,
    destroy,
    controls: {
      openLogin,
      closeLogin,
      openRegister,
      closeRegister
    }
  };

  return (
    <SessionContext.Provider value={ value }>
      { children }
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
export const SessionConsumer = SessionContext.Consumer;
