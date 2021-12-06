import { gql } from '@apollo/client';


export const CANCEL_AUTH_EID = gql`
  mutation AuthEidCancel ($requestId: String!) {
    authEidCancel (requestId: $requestId) {
      status
    }
  }
`;
