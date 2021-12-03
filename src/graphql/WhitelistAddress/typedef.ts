import { AuthEidStatusData, AccountType } from '../typedef';


export type WhitelistVariables = {
  label: string;
  address: string;
};

export type WhitelistData = {
  authEidSignAddress: {
    requestId: string;
  }
};

export type WhitelistStatusVariables = {
  requestId: string;
};

export type WhitelistStatusData = {
  authEidSignAddressStatus: AuthEidStatusData;
};

export type WhitelistedAddress = {
  acct_num: string;
  ref: null | string;
  type: AccountType.WALLET;
  name: string;
}

type Item = {
  data: WhitelistedAddress;
}

export type WhitelistedAddressesData = {
  filterAccounts: {
    items: Item[];
  };
};

export type ValidateAddressesVariables = {
  address: string;
};

export type ValidateAddressesData = {
  validateAddress: {
    data: {
      status: boolean;
    };
  };
};
