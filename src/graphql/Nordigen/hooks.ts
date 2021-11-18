import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery, LazyQueryHookOptions } from '@apollo/client';

import { BanksVariables, BanksData, AgreementVariables, AgreementData, AccountsData, AccountsVariables, SaveBankAccountData, SaveBankAccountVariables } from './typedef';
import { FETCH_SUPPORTED_BANKS, CREATE_AGREEMENT, FETCH_LIST_OF_ACCOUNTS, CREATE_ACCOUNT } from './queries';

const REQ_ID_KEY = 'req-id-key';

export const useNordigen = (address: string) => {
  // eslint-disable-next-line max-len
  const [fetchBanks, banks] = useLazyQuery<BanksData, BanksVariables>(FETCH_SUPPORTED_BANKS, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [postAgreement, agreement] = useLazyQuery<AgreementData, AgreementVariables>(CREATE_AGREEMENT, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [fetchAccounts, accounts] = useLazyQuery<AccountsData, AccountsVariables>(FETCH_LIST_OF_ACCOUNTS, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [postAccount, account] = useLazyQuery<SaveBankAccountData, SaveBankAccountVariables>(CREATE_ACCOUNT, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line no-console

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
    if (!address) return;

    postAccount({ variables: { accountRef, xbtAddress: address } });
  };

  useEffect(() => {
    if (!agreement.data?.nordigenCreateAgreement.data.req_id) return;

    window.localStorage.setItem(REQ_ID_KEY, agreement.data?.nordigenCreateAgreement.data.req_id);
  }, [agreement.data?.nordigenCreateAgreement.data.req_id]);

  useEffect(() => {
    if (!accounts.data?.nordigenListAccounts.data.accounts.length) return;

    window.localStorage.removeItem(REQ_ID_KEY);
    createAccount(accounts.data.nordigenListAccounts.data.accounts[0]);
  }, [accounts.data?.nordigenListAccounts.data.accounts]);

  const loading = useMemo(() => {
    return agreement.loading || accounts.loading || account.loading;
  }, [agreement.loading, accounts.loading, account.loading]);

  return {
    loading,
    banksLoading: banks.loading,
    banks: banks.data?.nordigenSupportedBanks?.data || [],
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
