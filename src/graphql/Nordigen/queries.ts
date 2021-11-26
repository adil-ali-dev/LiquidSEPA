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

export const CREATE_ACCOUNT = gql`
  query NordigenSaveAllAccounts ($reqId: String!) {
    nordigenSaveAllAccounts(reqId: $reqId) {
      data
    }
  }
`;
