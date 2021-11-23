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

export type WhitelistedAddressesData = {
  filterAccounts: any;
};
