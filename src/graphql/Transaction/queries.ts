import { gql } from '@apollo/client';

export const FETCH_RFQ_STATUS = gql`
  query RfqStatus ($rfqId: String!) {
    rfqStatus (rfqId: $rfqId) {
      data
    }
  }
`;

export const FETCH_TX_STATUS = gql`
  query TxStatus ($txId: String!) {
    txStatus (txId: $txId) {
      data
    }
  }
`;
