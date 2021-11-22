import { gql } from '@apollo/client';

export const AUTH_EID_SIGNUP = gql`
  mutation PegXMutations {
    authEidSignup {
      requestId
    }
  }
`;

export const AUTH_EID_LOGIN = gql`
  mutation AuthEidAuthorize {
    authEidAuthorize {
      requestId
    }
  }
`;

export const FETCH_AUTH_EID_SIGNUP_STATUS = gql`
  query AuthEidSignupStatus ($requestId: String!) {
    authEidSignupStatus (requestId: $requestId) {
      status
    }
  }
`;

export const FETCH_AUTH_EID_LOGIN_STATUS = gql`
  query AuthEidAuthorizeStatus ($requestId: String!) {
    authEidAuthorizeStatus (requestId: $requestId) {
      status
      entityId
    }
  }
`;

export const SESSION_STATUS = gql`
  mutation PegXMutations {
    userSession {
      hasSession
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      status
    }
  }
`;
