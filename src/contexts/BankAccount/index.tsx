import React, { useContext, useState, createContext, FC, ReactNode, useCallback, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const BankAccountContext = createContext({
  modalStatus: false,
  success: false,
  error: null as null | string,
  processing: false,
  controls: {
    open: () => {},
    openStatus: (_?: null | string) => {},
    openProcessing: () => {},
    closeProcessing: () => {},
    closeStatus: () => {},
    close: () => {}
  }
});

export const BankAccountProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [processing, setProcessing] = useState(false);

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

  const closeProcessing = useCallback(() => {
    setProcessing(false);
  }, []);

  const openStatus = useCallback((errorMsg?: null | string) => {
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
    success,
    error,
    processing,
    controls: {
      open,
      close,
      openProcessing,
      closeProcessing,
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
