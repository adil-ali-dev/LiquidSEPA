import React, { useContext, useState, createContext, FC, ReactNode, useCallback, useEffect } from 'react';

import { BankAccount } from '../../graphql/BankAccount/typedef';
import { useBankAccounts } from '../../graphql/BankAccount/hooks';
import { useSessionContext } from '../Session';

type Props = {
  children: ReactNode;
};

const BankAccountContext = createContext({
  modalStatus: false,
  accounts: [] as BankAccount[],
  success: false,
  error: null as null | string,
  processing: false,
  controls: {
    open: () => {},
    openStatus: (_?: string) => {},
    openProcessing: () => {},
    closeStatus: () => {},
    close: () => {}
  }
});

export const BankAccountProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [processing, setProcessing] = useState(false);

  const { fetch, accounts } = useBankAccounts();

  const { status } = useSessionContext();

  useEffect(() => {
    if (modalStatus || !status) return;

    fetch();
  }, [modalStatus, status]);

  useEffect(() => {
    if (!error || !success) return;

    setProcessing(false);
  }, [error, success]);

  const open = useCallback(() => {
    setModalStatus(true);
  }, []);

  const close = useCallback(() => {
    setModalStatus(false);
  }, []);

  const openProcessing = useCallback(() => {
    setProcessing(true);
  }, []);

  const openStatus = useCallback((errorMsg?: string) => {
    setProcessing(false);

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setSuccess(true);
    }
  }, []);

  const closeStatus = useCallback((errorMsg?: string) => {
    setError(null);
    setSuccess(false);
  }, []);

  const value = {
    modalStatus,
    accounts,
    success,
    error,
    processing,
    controls: {
      open,
      close,
      openProcessing,
      openStatus,
      closeStatus
    }
  };

  return (
    <BankAccountContext.Provider value={ value }>
      { children }
    </BankAccountContext.Provider>
  );

};

export const useBankAccountContext = () => useContext(BankAccountContext);
