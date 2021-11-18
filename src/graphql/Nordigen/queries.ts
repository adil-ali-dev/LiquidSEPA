import { gql } from '@apollo/client';

export const FETCH_SUPPORTED_BANKS = gql`
  query NordigenSupportedBanks ($countryCode: String!) {
    nordigenSupportedBanks(countryCode: $countryCode) {
      data
    }
  }
`;

export const CREATE_AGREEMENT = gql`
  query NordigenCreateAgreement ($bankId: String!) {
    nordigenCreateAgreement(bankId: $bankId) {
      data
    }
  }
`;

export const FETCH_LIST_OF_ACCOUNTS = gql`
  query NordigenListAccounts ($reqId: String!) {
    nordigenListAccounts(reqId: $reqId) {
      data
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  query NordigenSaveBankAccount ($accountRef: String!, $xbtAddress: String!) {
    nordigenSaveBankAccount(accountRef: $accountRef, xbtAddress: $xbtAddress) {
      data
    }
  }
`;
