export type BankAccount = {
  acct_num: string;
  ref: null | string;
  type: 'Bank';
  name: string;
}

type Item = {
  data: BankAccount;
}

export type BankAccountsData = {
  filterAccounts: {
    items: Item[];
  };
};
