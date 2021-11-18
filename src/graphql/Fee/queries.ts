import { gql } from '@apollo/client';

export const ESTIMATE_FEE = gql`
  query Estimate ($amount: Float!) {
    estimate (amount: $amount) {  
      charge
      payout
      fee
    }
  }
`;
