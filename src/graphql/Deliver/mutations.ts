import { gql } from '@apollo/client';

export const DEPOSIT_EURX = gql`
  mutation EurXRfq ($amount: Float!, $iban: String!) {
    eurXRfq (eurxDepositAmount: $amount, payoutAccountIban: $iban) {
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
  mutation EurRfq ($amount: Float!, $label: String!) {
    eurRfq (eurDepositAmount: $amount, label: $label) {  
      rfqId
      payoutEstimation
      fee
      charge
      isValid
    }
  }
`;
