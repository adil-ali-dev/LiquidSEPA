import { SignatureStatus, AuthEidStatusData } from '../typedef';

export type WhitelistVariables = {
  iban: string;
  label: string;
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
