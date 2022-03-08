import React, { useContext, useState, createContext, FC, useCallback, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Context, Props } from './typedef';
import { addressesItemsLoadingSelector, addressesItemsSelector } from '../../store/Addresses';
import { bankAccountsItemsLoadingSelector, bankAccountsItemsSelector } from '../../store/BankAccounts';
import { WelcomeModule } from '../../modules/Welcome';

const WelcomeContext = createContext<Context>({
  modalStatus: false,
  controls: {
    open: () => {},
    close: () => {}
  }
});

export const WelcomeProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState<null | boolean>(null);

  const addresses = useSelector(addressesItemsSelector);
  const addressesLoading = useSelector(addressesItemsLoadingSelector);
  const bankAccounts = useSelector(bankAccountsItemsSelector);
  const bankAccountsLoading = useSelector(bankAccountsItemsLoadingSelector);

  const open = useCallback(() => {
    setModalStatus(true);
  }, []);

  const close = useCallback(() => {
    setModalStatus(false);
  }, []);

  useEffect(() => {
    if (addressesLoading || bankAccountsLoading || bankAccounts.length || addresses.length) return;

    open();
  }, [addressesLoading, bankAccountsLoading]);

  const value = {
    modalStatus: modalStatus,
    controls: { open, close }
  };

  return (
    <WelcomeContext.Provider value={ value }>
      { children }
      <WelcomeModule />
    </WelcomeContext.Provider>
  );

};

export const useWelcomeContext = () => useContext(WelcomeContext);
