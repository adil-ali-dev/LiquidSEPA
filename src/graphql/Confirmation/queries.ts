import { gql } from '@apollo/client';

export const CONFIRM = gql`
  mutation ConfirmRfq ($rfqId: String, $confirm: Boolean) {
    confirmRfq (rfqId: $rfqId, confirm: $confirm) {
      rfqId
      trackingCode
      isValid
      errorMessage
    }
  }
`;
