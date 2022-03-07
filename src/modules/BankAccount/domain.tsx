import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { default as countries } from '../../constants/nordigen-countries';
import { SupportedBank, Country, StatusModalType } from '../../typedef';
import { Props } from './typedef';
import { bankAccountsActions, bankAccountsAgreementLinkLoadingSelector, bankAccountsAgreementLinkSelector, bankAccountsCreateLoadingSelector, bankAccountsItemsLoadingSelector, bankAccountsItemsSelector, bankAccountsSupportedBanksLoadingSelector, bankAccountsSupportedBanksSelector, bankAccountsWaitingForContinueSelector } from '../../store/BankAccounts';
import { sessionStatusSelector } from '../../store/Session';
import { addressesItemsLoadingSelector, addressesItemsSelector } from '../../store/Addresses';
import { useBankAccountContext } from '../../contexts/BankAccount';
import { StatusModal } from '../../components/StatusModal';
import { useWhitelistAddressContext } from '../../contexts/WhitelistAddress';

export const withBankAccountDomain = (Component: FC<Props>) => () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState<null | Country>(null);
  const [bank, setBank] = useState<null | SupportedBank>(null);

  const { modalStatus, controls } = useBankAccountContext();
  const { modalStatus: addressModalStatus } = useWhitelistAddressContext();

  const sessionStatus = useSelector(sessionStatusSelector);
  const addresses = useSelector(addressesItemsSelector);
  const addressesLoading = useSelector(addressesItemsLoadingSelector);
  const bankAccounts = useSelector(bankAccountsItemsSelector);
  const bankAccountsLoading = useSelector(bankAccountsItemsLoadingSelector);
  const supportedBanks = useSelector(bankAccountsSupportedBanksSelector);
  const supportedBanksLoading = useSelector(bankAccountsSupportedBanksLoadingSelector);
  const agreementLink = useSelector(bankAccountsAgreementLinkSelector);
  const agreementLinkLoading = useSelector(bankAccountsAgreementLinkLoadingSelector);
  const loading = useSelector(bankAccountsCreateLoadingSelector);
  const waitingForContinue = useSelector(bankAccountsWaitingForContinueSelector);

  const inputRequired = useMemo(() => {
    return !waitingForContinue && !bankAccountsLoading && !addressesLoading && !!addresses.length && !bankAccounts.length;
  }, [bankAccountsLoading, addressesLoading, waitingForContinue]);

  useEffect(() => {
    if (!inputRequired || addressModalStatus) return;

    controls.open();
  }, [inputRequired, addressModalStatus]);

  useEffect(() => {
    if (modalStatus) return;

    setBank(null);
    setCountry(null);
  }, [modalStatus]);

  useEffect(() => {
    if (!country) return;

    dispatch(bankAccountsActions.getSupportedBanks({ countryCode: country.code }));
  }, [country]);

  useEffect(() => {
    if (!window.location.search || !sessionStatus) return;

    const params = new URL(window.location.href).searchParams;
    const ref = params.get('ref');
    const error = params.get('error');
    if (!ref || !waitingForContinue) return;

    history.replace('');

    if (error) {
      dispatch(bankAccountsActions.createBankAccountFailure(error));
      return;
    }

    dispatch(bankAccountsActions.createBankAccount({ ref }));
  }, [sessionStatus]);

  useEffect(() => {
    if (!agreementLink) return;

    window.open(agreementLink, '_parent');
  }, [agreementLink]);

  const handleCountryChange = useCallback((_: ChangeEvent<Record<string, unknown>>, value: null | Country) => {
    setCountry(value);
    setBank(null);
  }, []);

  const handleBankChange = useCallback((_: ChangeEvent<Record<string, unknown>>, value: null | SupportedBank) => {
    setBank(value);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bank || !country) return;

    dispatch(bankAccountsActions.createAgreementLink({ bankId: bank.id }));
  }, [bank, country]);

  return (
    <>
      <Component
        status={ modalStatus }
        handleClose={ inputRequired ? undefined : controls.close }
        country={ country }
        banksLoading={ supportedBanksLoading }
        bank={ bank }
        banks={ supportedBanks }
        countries={ countries }
        loading={ agreementLinkLoading }
        handleCountryChange={ handleCountryChange }
        handleBankChange={ handleBankChange }
        handleSubmit={ handleSubmit }
        disabled={ !bank || !country }
      />
      <StatusModal
        type={ StatusModalType.PROCESSING }
        status={ loading }
      />
    </>
  );
};
