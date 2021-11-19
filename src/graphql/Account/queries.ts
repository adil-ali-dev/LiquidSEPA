import { gql } from '@apollo/client';

export const WHITELIST_ADDRESS = gql`
  mutation PegXMutations (
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
