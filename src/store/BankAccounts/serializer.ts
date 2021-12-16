import { NORDIGEN_BANK_LOGO_PREFIX } from '../../constants';
import { BankAccount } from '../../typedef';


export const serializeBankAccount = (account: BankAccount) => ({
  ...account,
  logo: `${NORDIGEN_BANK_LOGO_PREFIX}${account.accountDetails?.bankId}.png`
});

export const serializeBankAccounts = (accounts: BankAccount[]) => accounts.map(serializeBankAccount);
