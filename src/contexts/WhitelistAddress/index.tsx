import React, { useContext, useState, createContext, FC, ReactNode, useCallback, useEffect } from 'react';
import { useWhitelistedAddresses } from '../../graphql/WhitelistAddress/hooks';
import { WhitelistedAddress } from '../../graphql/WhitelistAddress/typedef';

type Props = {
  children: ReactNode;
};

const WhitelistAddressContext = createContext({
  modalStatus: false,
  addresses: [] as WhitelistedAddress[],
  success: false,
  error: null as null | string,
  controls: {
    open: () => {},
    close: () => {},
    openStatus: (_?: string) => {},
    closeStatus: () => {}
  }
});

export const WhitelistAddressProvider: FC<Props> = ({ children }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

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

  const openStatus = useCallback((errorMsg?: string) => {
    close();

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setSuccess(true);
    }
  }, []);

  const closeStatus = useCallback(() => {
    setSuccess(false);
    setError(null);
  }, []);

  const value = {
    modalStatus,
    addresses,
    success,
    error,
    controls: {
      open,
      close,
      openStatus,
      closeStatus,
    }
  }

  return (
    <WhitelistAddressContext.Provider value={ value }>
      { children }
    </WhitelistAddressContext.Provider>
  );

};

export const useWhitelistAddressContext = () => useContext(WhitelistAddressContext);
