import React, { ChangeEvent, ComponentType, FormEvent, KeyboardEvent, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';

import { CreatedAccount, Props } from './typedef';
import { useNordigen } from '../../graphql/Nordigen/hooks';
import { Bank, Country } from '../../graphql/Nordigen/typedef';
import { BitcoinAddressService } from '../../services';
import { useNordigenContext } from '../../contexts/Nordigen';
import { useSessionContext } from '../../contexts/Session';
import { BankAccountModal } from '../../components/BankAccountModal';
import { useBankAccounts } from '../../graphql/BankAccount/hooks';
import { useBankAccountContext } from '../../contexts/BankAccount';

const ADDRESS_KEY_NAME = 'address-key';

export const withNordigenDomain = (Component: ComponentType<Props>) => () => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);

  const [modalStep, setModalStep] = useState(0);
  const [address, setAddress] = useState('');
  const [bank, setBank] = useState<null | Bank>(null);
  const [bankSelected, setBankSelected] = useState(false);
  const [final, setFinal] = useState(false);
  const [error, setError] = useState(false);
  const [account, setAccount] = useState<null | CreatedAccount>(null);
  const [country, setCountry] = useState<Country | null>(null);

  const { modalStatus, iban, modalControls, setNordigenIban, modalType } = useNordigenContext();
  const bankAccount = useBankAccountContext();
  const nordigen = useNordigen(address);
  const { status: isLoggedIn } = useSessionContext();

  useEffect(() => {
    if (country?.code) nordigen.getBanksByCountry(country.code);
  }, [country]);

  const disabled = useMemo(() => {
    if (!modalStep) {
      return !address;
    }

    if (modalStep) {
      // eslint-disable-next-line no-nested-ternary
      return final ? (error ? false : !account) : (!bankSelected && !bank?.id);
    }

    return false;
  }, [address, modalStep, bankSelected, final, bank, error, account]);

  useEffect(() => {
    if (!nordigen.account?.iban) return;

    setAccount(nordigen.account);
    setNordigenIban(nordigen.account.iban);
  }, [nordigen.account?.iban]);

  useEffect(() => {
    if (!iban || nordigen.banks.length) return;

    nordigen.getBanks(iban);
  }, [iban]);

  useEffect(() => {
    if (error) return;

    const nordigenCallbackError = !!new URL(window.location.href).searchParams.get('error');
    setError(nordigen.error || nordigenCallbackError);
  }, [nordigen.error, window.location.search]);

  useEffect(() => {
    if (!window.location.search) return;

    const params = new URL(window.location.href).searchParams;
    if (!params.get('ref') || !nordigen.reqId) return;

    history.replace('');

    const cachedAddress = window.localStorage.getItem(ADDRESS_KEY_NAME);
    if (cachedAddress) {
      setAddress(cachedAddress);
      window.localStorage.removeItem(ADDRESS_KEY_NAME);
    }

    bankAccount.controls.openWithSuccess();
    nordigen.getAccounts(!!params.get('error'));
  }, [window.location.search]);

  const handleAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    BitcoinAddressService.validate(value, addressError => {
      setAddress(value);
    });
  }, []);

  const handleBankChange = useCallback((value: Bank | null) => {
    if (!value) return;

    setBank(value);
    setBankSelected(true);
    nordigen.createAgreement(value.id);
  }, []);

  const handleEnterTextAreaPress = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && formRef?.current) {
      formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      event.preventDefault();
    }
  }, []);

  const handleModalCloseClick = useCallback(() => {
    if (nordigen.loading) return;

    modalControls.close();
    // Waiting for closing animation
    setTimeout(() => {
      setAddress('');
      setModalStep(0);
      setFinal(false);
      setError(false);
      setBank(null);
      setBankSelected(false);
      setAccount(null);
    }, 200);
  }, [nordigen.loading]);

  const handleModalSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (disabled) return;

    if (account || error) {
      handleModalCloseClick();
      return;
    }

    if (!modalStep) {
      setModalStep(1);
    } else {
      if (!bankSelected) {
        if (!bank) return;

        setBankSelected(true);
        nordigen.createAgreement(bank.id);
      } else {
        nordigen.link && window.open(nordigen.link, '_parent');
        window.localStorage.setItem(ADDRESS_KEY_NAME, address);
      }
    }
  }, [modalStep, bank, bankSelected, address, nordigen.link, final, account, error]);

  const handleCountryChange =
    (value: null | { code: string, name: string }) => {
      if (!value) return;

      setCountry(value);
    };

  const handleWhitelist = () => {
    alert('submit');
  };

  return (
    <BankAccountModal
      status={modalStatus}
      handleClose={handleModalCloseClick}
      country={''}
      bank={address}
      loading={false}
      handleLabelChange={() => {}}
      handleAddressChange={handleAddressChange}
      handleSubmit={() => {}}
    />
    // <SuccessAlertModal
    //   status={modalStatus}
    //   handleClose={handleModalCloseClick}
    //   label={''}
    //   address={address}
    //   loading={false}
    //   handleLabelChange={() => {}}
    //   handleAddressChange={handleAddressChange}
    //   handleSubmit={() => {}}
    // />
  );
};
