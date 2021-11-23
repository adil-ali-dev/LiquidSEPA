import { useLazyQuery } from '@apollo/client';

import { FETCH_BANK_ACCOUNTS } from './queries';
import { BankAccountsData } from './typedef';

export const useBankAccounts = () => {
  const [fetch, { data, ...result }] = useLazyQuery<BankAccountsData>(FETCH_BANK_ACCOUNTS);

  return { ...result, accounts: data?.filterAccounts, fetch };
};
