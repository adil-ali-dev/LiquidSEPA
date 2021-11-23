import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Props } from './typedef';
import { useNordigen } from '../../graphql/Nordigen/hooks';
import { Bank, Country } from '../../graphql/Nordigen/typedef';
import { useBankAccountContext } from '../../contexts/BankAccount';

const REQ_ID_KEY = 'req-id-key';

export const withBankAccountDomain = (Component: FC<Props>) => () => {
  const history = useHistory();
  const [country, setCountry] = useState<null | Country>(null);
  const [bank, setBank] = useState<null | Bank>(null);

  const { modalStatus, success, controls } = useBankAccountContext();
  const { banks, banksLoading, countries, link, getBanksByCountry, reqId, loading, createAgreement } = useNordigen('');

  useEffect(() => {
    if (!country) return;

    getBanksByCountry(country.code)
  }, [country]);

  useEffect(() => {
    if (!window.location.search) return;

    const params = new URL(window.location.href).searchParams;
    if (!params.get('ref') || !reqId) return;

    history.replace('');
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
    <Component
      status={ modalStatus }
      handleClose={ controls.close }
      country={ country }
      banksLoading={ banksLoading }
      bank={ bank }
      success={ success }
      banks={ banks }
      countries={ countries }
      loading={ loading }
      handleCountryChange={ handleCountryChange }
      handleBankChange={ handleBankChange }
      handleSubmit={ handleSubmit }
      disabled={ !bank || !country }
    />
  );
};
