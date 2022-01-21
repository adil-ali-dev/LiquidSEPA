import React, { useContext, useState, createContext, FC, useCallback } from 'react';

import { Context, Props } from './typedef';

const BankAccountContext = createContext<Context>({
  modalStatus: false,
  controls: {
    open: () => {},
    close: () => {}
  }
});

export const BankAccountProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);

  const open = useCallback(() => {
    setModalStatus(true);
  }, []);

  const close = useCallback(() => {
    setModalStatus(false);
  }, []);

  const value = {
    modalStatus,
    controls: { open, close }
  };

  return (
    <BankAccountContext.Provider value={ value }>
      { children }
    </BankAccountContext.Provider>
  );

};

export const useBankAccountContext = () => useContext(BankAccountContext);
