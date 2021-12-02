import { useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import { NORDIGEN_BANK_LOGO_PREFIX } from '../../constants';
import { BankAccountsData } from './typedef';
import { FETCH_BANK_ACCOUNTS } from './queries';


export const useBankAccounts = () => {
  const [fetch, { data, ...result }] = useLazyQuery<BankAccountsData>(FETCH_BANK_ACCOUNTS, { fetchPolicy: 'no-cache' });

  const accounts = useMemo(() => {
    const items = data?.filterAccounts.items;
    if (!items?.length) return [];

    return items.map(({ data }) => ({
      ...data,
      logo: `${NORDIGEN_BANK_LOGO_PREFIX}${data.account_details?.bank_id}.png`
    }));
  }, [data?.filterAccounts.items]);

  return { ...result, accounts, fetch };
};
