export type SignUpVariables = {
  iban: string;
  address: string;
  email: string;
  password: string;
};

export type SignUpData = {
  signup: {
    error: boolean;
    errorMessage: null | string;
    sessionId: string;
  }
};

export type LogInVariables = {
  email: string;
  password: string;
};

export type LogInData = {
  simpleLogin: {
    status: boolean;
    sessionKey: string;
  }
};

export type AuthEidSignupData = {
  authEidSignup: {
    requestId: string;
  }
};
