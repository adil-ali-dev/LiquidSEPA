import { SignatureStatus, AuthEidStatusData } from '../typedef';

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
  type: 'Wallet';
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
