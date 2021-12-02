import { AccountType } from '../typedef';


export type BankAccount = {
  account_details?: {
    bank_id: string;
    bank_name: string;
  };
  acct_num: string;
  ref: null | string;
  type: AccountType.BANK;
  name: string;
  logo?: string;
}

type Item = {
  data: BankAccount;
}

export type BankAccountsData = {
  filterAccounts: {
    items: Item[];
  };
};
