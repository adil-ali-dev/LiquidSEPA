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

export type AccountsVariables = {
  reqId: string;
};

export type AccountsData = {
  nordigenListAccounts: {
    data: {
      accounts: string[]
    };
  }
};

export type SaveBankAccountVariables = {
  accountRef: string;
  xbtAddress?: string;
};

export type SaveBankAccountData = {
  nordigenSaveBankAccount: {
    data: {
      account_operation: boolean;
      iban: null | string;
      name: null | string;
      reason: string;
    };
  }
};
