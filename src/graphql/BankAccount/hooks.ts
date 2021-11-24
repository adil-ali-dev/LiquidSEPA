import { useLazyQuery } from '@apollo/client';

import { FETCH_BANK_ACCOUNTS } from './queries';
import { BankAccountsData } from './typedef';
import { useMemo } from 'react';

export const useBankAccounts = () => {
  const [fetch, { data, ...result }] = useLazyQuery<BankAccountsData>(FETCH_BANK_ACCOUNTS, { fetchPolicy: 'no-cache' });

  const accounts = useMemo(() => {
    const items = data?.filterAccounts.items;
    if (!items?.length) return [];

    return items.map(i => i.data);
  }, [data?.filterAccounts.items]);

  return { ...result, accounts, fetch };
};
