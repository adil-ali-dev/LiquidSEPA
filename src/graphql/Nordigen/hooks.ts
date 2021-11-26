import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FETCH_SUPPORTED_BANKS, CREATE_AGREEMENT, CREATE_ACCOUNT } from './queries';
import { default as countries } from '../../constants/nordigen-countries';
import { BanksVariables, BanksData, AgreementVariables, AgreementData, SaveBankAccountData, SaveBankAccountVariables } from './typedef';

const REQ_ID_KEY = 'req-id-key';

export const useNordigen = (cb: (error?: string) => void) => {
  // eslint-disable-next-line max-len
  const [fetchBanks, banks] = useLazyQuery<BanksData, BanksVariables>(FETCH_SUPPORTED_BANKS, { fetchPolicy: 'no-cache' });
  // eslint-disable-next-line max-len
  const [postAgreement, agreement] = useLazyQuery<AgreementData, AgreementVariables>(CREATE_AGREEMENT, { fetchPolicy: 'no-cache' });
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

  const saveAccount = (error: boolean) => {
    if (!reqId) return;

    if (error) {
      window.localStorage.removeItem(REQ_ID_KEY);
      return;
    }

    postAccount({ variables: { reqId } });
  };

  useEffect(() => {
    const error = banks.error || agreement.error || account.error;
    if (!error) return;

    cb(error.message || 'Something went wrong');
  }, [banks.error, agreement.error, account.error]);

  useEffect(() => {
    if (!agreement.data?.nordigenCreateAgreement.data.req_id) return;

    window.localStorage.setItem(REQ_ID_KEY, agreement.data?.nordigenCreateAgreement.data.req_id);
  }, [agreement.data?.nordigenCreateAgreement.data.req_id]);

  useEffect(() => {
    if (account.data?.nordigenSaveAllAccounts.data.success !== undefined) {
      window.localStorage.removeItem(REQ_ID_KEY);
      cb(account.data?.nordigenSaveAllAccounts.data.reason);
    }
  }, [account.data?.nordigenSaveAllAccounts.data.success]);

  const loading = useMemo(() => {
    return agreement.loading || account.loading;
  }, [agreement.loading, account.loading]);

  return {
    loading,
    banksLoading: banks.loading,
    banks: banks.data?.nordigenSupportedBanks?.data || [],
    countries,
    link: agreement.data?.nordigenCreateAgreement.data.initiate,
    reqId,
    error: account.data?.nordigenSaveAllAccounts.data.reason,
    getBanks,
    getBanksByCountry,
    saveAccount,
    createAgreement
  };
};
