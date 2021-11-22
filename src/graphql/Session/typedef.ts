import { SignatureStatus, AuthEidStatusData } from '../typedef';

export type AuthEidStatusVariables = {
  requestId: string;
};

export type AuthEidSignupData = {
  authEidSignup: {
    requestId: string;
  }
};

export type AuthEidSignupStatusData = {
  authEidSignupStatus: AuthEidStatusData;
};

export type AuthEidAuthorizeData = {
  authEidAuthorize: {
    requestId: string;
  }
};

export type AuthEidAuthorizeStatusData = {
  authEidAuthorizeStatus: AuthEidStatusData;
};

export type UserSessionData = {
  userSession: {
    hasSession: boolean;
  }
};
