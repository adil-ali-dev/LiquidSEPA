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
  query AuthEidSignAddress ($requestId: String!) {
    authEidSignAddress (requestId: $requestId) {
      status
    }
  }
`;
