import { BankAccount } from '../BankAccount/typedef';

export type Bank = {
  bic: string;
  countries: string[];
  id: string;
  logo: string;
  name: string;
};

export type Country = {
  name: string;
  code: string;
};

export type BanksVariables = {
  countryCode: string;
};

export type BanksData = {
  nordigenSupportedBanks: {
    data: Bank[];
  };
};

export type AgreementVariables = {
  bankId: string;
};

export type AgreementData = {
  nordigenCreateAgreement: {
    data: {
      initiate: string;
      req_id: string;
    };
  }
};

export type SaveBankAccountVariables = {
  reqId: string;
};

export type SaveBankAccountData = {
  nordigenSaveAllAccounts: {
    data: {
      success: boolean;
      accounts: BankAccount[];
      reason: string;
    };
  }
};
