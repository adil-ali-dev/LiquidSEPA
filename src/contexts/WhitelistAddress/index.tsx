import React, { useContext, useState, createContext, FC, ReactNode, useCallback, useEffect } from 'react';
import { useWhitelistedAddresses } from '../../graphql/WhitelistAddress/hooks';

type Props = {
  children: ReactNode;
};

const WhitelistAddressContext = createContext({
  modalStatus: false,
  addresses: [],
  controls: {
    open: () => {},
    close: () => {}
  }
});

export const WhitelistAddressProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);

  const { fetch, addresses } = useWhitelistedAddresses();

  useEffect(() => {
    if (modalStatus) return;

    fetch();
  }, [modalStatus]);

  const open = useCallback(() => {
    setModalStatus(true);
  }, []);

  const close = useCallback(() => {
    setModalStatus(false);
  }, []);

  return (
    <WhitelistAddressContext.Provider value={{ modalStatus, addresses, controls: { open, close } }}>
      { children }
    </WhitelistAddressContext.Provider>
  );

};

export const useWhitelistAddressContext = () => useContext(WhitelistAddressContext);
