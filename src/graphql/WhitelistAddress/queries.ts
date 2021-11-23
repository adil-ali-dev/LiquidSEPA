import { gql } from '@apollo/client';

export const WHITELIST_ADDRESS = gql`
  mutation AuthEidSignAddress (
    $address: String,
    $label: String
  ) {
    authEidSignAddress (
      xbtAddress: $address,
      label: $label
    ) {
      requestId
    }
  }
`;

export const FETCH_WHITELIST_ADDRESS_STATUS = gql`
  query AuthEidSignAddressStatus ($requestId: String!) {
    authEidSignAddressStatus (requestId: $requestId) {
      status
    }
  }
`;

export const FETCH_WHITELISTED_ADDRESSES = gql`
  query FilterAccounts {
    filterAccounts (accountType: "Wallet") {
      status
    }
  }
`;
