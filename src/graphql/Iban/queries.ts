import { gql } from '@apollo/client';

export const CHECK_IBAN = gql`
  query Iban ($iban: String!) {
    iban (iban: $iban) {  
      valid
    }
  }
`;
