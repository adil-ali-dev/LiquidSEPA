import { gql } from '@apollo/client';

export const FETCH_BANK_ACCOUNTS = gql`
  query FilterAccounts {
    filterAccounts (accountType: "Bank") {
      status
    }
  }
`;
