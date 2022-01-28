import React, { createContext, FC, ReactNode, useState, useContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sessionActions, sessionHadSessionSelector, sessionStatusSelector } from '../../store/Session';
import { isMobile } from 'react-device-detect';


const SessionContext = createContext({
  status: false,
  statusForUI: false,
  loading: false,
  statusLoginModal: false,
  statusRegisterModal: false,
  destroy: (): void => {},
  controls: {
    openLogin: (_?: string | null): void => {},
    closeLogin: (): void => {},
    openRegister: (_?: string | null): void => {},
    closeRegister: (): void => {}
  }
});

type Props = {
  children: ReactNode;
};


export const SessionProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const status = useSelector(sessionStatusSelector);
  const statusForUI = useSelector(sessionHadSessionSelector);
  const [statusLoginModal, setStatusLoginModal] = useState(false);
  const [statusRegisterModal, setStatusRegisterModal] = useState(false);

  const openUrl = (url?: string | null) => {
    if (!url) return;

    window.open(url, '_blank');
  };

  const destroy = () => {
    dispatch(sessionActions.destroy());
  };

  const openLogin = (url?: string | null) => {
    if (isMobile) {
      openUrl(url);
    } else {
      setStatusLoginModal(true);
    }
  };

  const closeLogin = () => {
    setStatusLoginModal(false);
  };

  const openRegister = (url?: string | null) => {
    if (isMobile) {
      openUrl(url);
    } else {
      setStatusRegisterModal(true);
    }
  };

  const closeRegister = () => {
    setStatusRegisterModal(false);
  };

  const value = {
    status: !!status,
    statusForUI,
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
