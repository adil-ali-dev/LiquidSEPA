import { useMutation } from '@apollo/client';

import { SignUpData, SignUpVariables, LogInData, LogInVariables, AuthEidSignupData } from './typedef';
import { SIGN_UP, LOG_IN, AUTH_EID_SIGNUP } from './queries';

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
