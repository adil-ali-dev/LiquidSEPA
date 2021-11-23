import React, { useContext, useState, createContext, FC, ReactNode, useCallback, useEffect } from 'react';
import { useBankAccounts } from '../../graphql/BankAccount/hooks';

type Props = {
  children: ReactNode;
};

const BankAccountContext = createContext({
  modalStatus: false,
  accounts: [],
  success: false,
  controls: {
    open: () => {},
    openWithSuccess: () => {},
    close: () => {}
  }
});

export const BankAccountProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [success, setSuccess] = useState(false);

  const { fetch, accounts } = useBankAccounts();

  useEffect(() => {
    if (modalStatus) return;

    fetch();
  }, [modalStatus]);

  const open = useCallback(() => {
    setModalStatus(true);
  }, []);

  const openWithSuccess = useCallback(() => {
    setSuccess(true);
    open();
  }, []);

  const close = useCallback(() => {
    setModalStatus(false);
    setSuccess(false);
  }, []);

  return (
    <BankAccountContext.Provider value={{ modalStatus, accounts, success, controls: { open, openWithSuccess, close } }}>
      { children }
    </BankAccountContext.Provider>
  );

};

export const useBankAccountContext = () => useContext(BankAccountContext);
