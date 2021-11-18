import { gql } from '@apollo/client';

export const DEPOSIT_EURX = gql`
  mutation EurXRfq (
    $amount: Float!,
    $iban: String!,
    $address: String
  ) {
    eurXRfq (
      eurxDepositAmount: $amount,
      payoutAccountIban: $iban,
      refundAddress: $address
    ) {
      rfqId
      isValid
      errorMessage
      payoutEstimation
      fee
      charge
    }
  }
`;

export const DEPOSIT_EUR = gql`
  mutation EurRfq ($amount: Float!, $address: String!) {
    eurRfq (eurDepositAmount: $amount, payoutAddress: $address) {  
      rfqId
      payoutEstimation
      fee
      charge
      isValid
    }
  }
`;
