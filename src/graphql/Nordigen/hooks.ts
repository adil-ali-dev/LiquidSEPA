import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_SUPPORTED_BANKS, CREATE_AGREEMENT, FETCH_LIST_OF_ACCOUNTS, CREATE_ACCOUNT } from './queries';
import { default as countries } from '../../constants/nordigen-countries';
import { BanksVariables, BanksData, AgreementVariables, AgreementData, AccountsData, AccountsVariables, SaveBankAccountData, SaveBankAccountVariables } from './typedef';

const REQ_ID_KEY = 'req-id-key';

export const useNordigen = (cb: (error?: string) => void) => {
  // eslint-disable-next-line max-len
  const [fetchBanks, banks] = useLazyQuery<BanksData, BanksVariables>(FETCH_SUPPORTED_BANKS, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [postAgreement, agreement] = useLazyQuery<AgreementData, AgreementVariables>(CREATE_AGREEMENT, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [fetchAccounts, accounts] = useLazyQuery<AccountsData, AccountsVariables>(FETCH_LIST_OF_ACCOUNTS, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [postAccount, account] = useLazyQuery<SaveBankAccountData, SaveBankAccountVariables>(CREATE_ACCOUNT, { fetchPolicy: 'no-cache' });

  const reqId = window.localStorage.getItem(REQ_ID_KEY);

  const getBanks = (iban: string) => {
    if (!iban) return;

    const countryCode = iban.slice(0, 2).toLowerCase();

    fetchBanks({ variables: { countryCode } });
  };

  const getBanksByCountry = (countryCode: string) => {
    fetchBanks({ variables: { countryCode } });
  };

  const createAgreement = (bankId: string) => {
    postAgreement({ variables: { bankId } });
  };

  const getAccounts = (error: boolean) => {
    if (!reqId) return;
    if (error) {
      window.localStorage.removeItem(REQ_ID_KEY);
      return;
    }

    fetchAccounts({ variables: { reqId } });
  };

  const createAccount = (accountRef: string) => {
    postAccount({ variables: { accountRef } });
  };

  useEffect(() => {
    const error = banks.error || agreement.error || accounts.error || account.error;
    if (!error) return;

    cb(error.message || 'Something went wrong');
  }, [banks.error, agreement.error, accounts.error, account.error]);

  useEffect(() => {
    if (!agreement.data?.nordigenCreateAgreement.data.req_id) return;

    window.localStorage.setItem(REQ_ID_KEY, agreement.data?.nordigenCreateAgreement.data.req_id);
  }, [agreement.data?.nordigenCreateAgreement.data.req_id]);

  useEffect(() => {
    if (!accounts.data?.nordigenListAccounts.data.accounts.length) return;

    window.localStorage.removeItem(REQ_ID_KEY);
    createAccount(accounts.data.nordigenListAccounts.data.accounts[0]);
  }, [accounts.data?.nordigenListAccounts.data.accounts]);

  useEffect(() => {
    if (account.data?.nordigenSaveBankAccount.data.account_operation !== undefined) {
      cb(account.data?.nordigenSaveBankAccount.data.reason);
    }
  }, [account.data?.nordigenSaveBankAccount.data.account_operation]);

  const loading = useMemo(() => {
    return agreement.loading || accounts.loading || account.loading;
  }, [agreement.loading, accounts.loading, account.loading]);

  return {
    loading,
    banksLoading: banks.loading,
    banks: banks.data?.nordigenSupportedBanks?.data || [],
    countries,
    link: agreement.data?.nordigenCreateAgreement.data.initiate,
    reqId,
    account: account.data?.nordigenSaveBankAccount.data?.iban ? {
      iban: account.data.nordigenSaveBankAccount.data.iban,
      name: account.data.nordigenSaveBankAccount.data.name
    } : null,
    error: account.data ? !account.data?.nordigenSaveBankAccount.data.account_operation : false,
    getBanks,
    getBanksByCountry,
    getAccounts,
    createAgreement
  };
};
