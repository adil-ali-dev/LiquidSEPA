import React, { useContext, useState, createContext, FC, useCallback } from 'react';

import { Context, Props } from './typedef';
import { log } from 'util';

const WhitelistAddressContext = createContext<Context>({
  modalStatus: false,
  controls: {
    open: () => {},
    close: () => {},
  }
});

export const WhitelistAddressProvider: FC<Props> = ({ children }) => {
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
    <WhitelistAddressContext.Provider value={ value }>
      { children }
    </WhitelistAddressContext.Provider>
  );

};

export const useWhitelistAddressContext = () => useContext(WhitelistAddressContext);
