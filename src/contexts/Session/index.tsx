import React, { createContext, FC, ReactNode, useState, useContext, useEffect } from 'react';

import { useSessionStatus } from '../../graphql/Session/hooks';

const SessionContext = createContext({
  status: false,
  loading: false,
  error: false,
  create: (): void => {},
  destroy: (): void => {}
});

type Props = {
  children: ReactNode;
};

export const SessionProvider: FC<Props> = ({ children }) => {
  const sessionStatus = useSessionStatus();

  const [status, setStatus] = useState(false);

  useEffect(() => {
    sessionStatus.status !== status && setStatus(sessionStatus.status || false);
  }, [sessionStatus.status]);

  const create = () => {
    setStatus(true);
  };

  const destroy = () => {
    setStatus(false);
  };

  const value = {
    status,
    create,
    destroy,
    loading: sessionStatus.loading,
    error: sessionStatus.error
  };

  return (
    <SessionContext.Provider value={ value }>
      { sessionStatus.loading ? null : children }
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
export const SessionConsumer = SessionContext.Consumer;
