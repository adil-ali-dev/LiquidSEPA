import { useMutation } from '@apollo/client';

import { SignUpData, SignUpVariables, LogInData, LogInVariables, AuthEidSignupData, AuthEidAuthorizeData, UserSessionData } from './typedef';
import { SIGN_UP, LOG_IN, AUTH_EID_SIGNUP, AUTH_EID_AUTHORIZE, SESSION_STATUS } from './queries';

export const useSignUp = () => {
  const [createAccount, { data, ...result }] = useMutation<SignUpData, SignUpVariables>(SIGN_UP);

  const signUp = (variables: SignUpVariables) => {
    createAccount({ variables });
  };

  return { ...result, data: data?.signup, signUp };
};

export const useLogIn = () => {
  const [createSession, { data, ...result }] = useMutation<LogInData, LogInVariables>(LOG_IN);

  const logIn = (variables: LogInVariables) => {
    createSession({ variables });
  };

  return { ...result, data: data?.simpleLogin, logIn };
};

export const useAuthEidSignup = () => {
  const [requestAuthEidReg, { data, ...result }] = useMutation<AuthEidSignupData>(AUTH_EID_SIGNUP);

  const authEidSignup = () => {
    // eslint-disable-next-line no-console
    requestAuthEidReg().catch(e => console.log(e));
  };

  return { ...result, data: data?.authEidSignup, authEidSignup };
};

export const useAuthEidAuthorize = () => {
  const [requestAuthEidAuth, { data, ...result }] = useMutation<AuthEidAuthorizeData>(AUTH_EID_AUTHORIZE);

  const authEidAuthorize = () => {
    // eslint-disable-next-line no-console
    requestAuthEidAuth().catch(e => console.log(e));
  };

  return { ...result, data: data?.authEidAuthorize, authEidAuthorize };
};

export const useSessionStatus = () => {
  const [requestSessionStatus, { data, error, loading }] = useMutation<UserSessionData>(SESSION_STATUS);

  const sessionStatus = () => {
    // eslint-disable-next-line no-console
    requestSessionStatus().catch(e => console.log(e));
  };

  return { status: data?.userSession.hasSession, error: !!error, sessionStatus, loading };
};
