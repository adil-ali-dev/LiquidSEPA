import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Props } from './typedef';
import { useNordigen } from '../../graphql/Nordigen/hooks';
import { Bank, Country } from '../../graphql/Nordigen/typedef';
import { useBankAccountContext } from '../../contexts/BankAccount';
import { StatusModalType } from '../../components/StatusModal/typedef';
import { SuccessAlertModal } from '../../components/StatusModal';

export const withBankAccountDomain = (Component: FC<Props>) => () => {
  const history = useHistory();
  const [country, setCountry] = useState<null | Country>(null);
  const [bank, setBank] = useState<null | Bank>(null);

  const { modalStatus, success, error, processing, controls } = useBankAccountContext();
  const { banks, banksLoading, countries, link, getBanksByCountry, reqId, loading, createAgreement, saveAccount } = useNordigen(controls.openStatus);

  useEffect(() => {
    if (!modalStatus && country && bank) {
      setBank(null);
      setCountry(null);
    }
  }, [modalStatus]);

  useEffect(() => {
    if (!country) return;

    getBanksByCountry(country.code)
  }, [country]);

  useEffect(() => {
    if (!window.location.search) return;

    const params = new URL(window.location.href).searchParams;
    if (!params.get('ref') || !reqId) return;

    history.replace('');

    const error = params.get('error');

    if (error) {
      controls.openStatus(error);
    } else {
      controls.openProcessing();
    }

    saveAccount(!!error);
  }, [window.location.search]);

  useEffect(() => {
    if (!link) return;

    window.open(link, '_parent');
  }, [link]);

  const handleCountryChange = useCallback((_: ChangeEvent<Record<string, unknown>>, value: null | Country) => {
    setCountry(value);
    setBank(null);
  }, []);

  const handleBankChange = useCallback((_: ChangeEvent<Record<string, unknown>>, value: null | Bank) => {
    setBank(value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bank || !country) return;

    createAgreement(bank.id);
  }, [bank, country]);

  return (
    <>
      <Component
        status={ modalStatus }
        handleClose={ controls.close }
        country={ country }
        banksLoading={ banksLoading }
        bank={ bank }
        banks={ banks }
        countries={ countries }
        loading={ loading }
        handleCountryChange={ handleCountryChange }
        handleBankChange={ handleBankChange }
        handleSubmit={ handleSubmit }
        disabled={ !bank || !country }
      />
      <SuccessAlertModal
        type={ StatusModalType.PROCESSING }
        status={ processing }
      />
      <SuccessAlertModal
        text="Account successfully created"
        type={ StatusModalType.SUCCESS }
        status={ success }
        handleClose={ controls.closeStatus }
        handleButtonClick={ controls.closeStatus }
      />
      <SuccessAlertModal
        text={ error }
        type={ StatusModalType.ERROR }
        status={ !!error }
        handleClose={ controls.closeStatus }
        handleButtonClick={ controls.closeStatus }
      />
    </>
  );
};
