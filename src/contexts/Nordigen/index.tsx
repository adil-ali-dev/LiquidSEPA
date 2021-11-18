import React, { useContext, useState, createContext, FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const NordigenContext = createContext({
  modalStatus: false,
  modalType: '',
  iban: '',
  setNordigenIban: (value: string) => {},
  modalControls: {
    open: (type?: string) => {},
    close: () => {}
  }
});

export const NordigenProvider: FC<Props> = ({ children }) => {
  const [iban, setIban] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [modalType, setModalType] = useState('');

  const open = (type?: string) => {
    setModalStatus(true);
    setModalType(type || '');
  };

  const close = () => {
    setModalStatus(false);
    setModalType('');
  };

  const value = {
    iban,
    modalStatus,
    modalType,
    setNordigenIban: setIban,
    modalControls: {
      open,
      close
    }
  };

  return (
    <NordigenContext.Provider value={ value }>
      { children }
    </NordigenContext.Provider>
  );

};

export const useNordigenContext = () => useContext(NordigenContext);
