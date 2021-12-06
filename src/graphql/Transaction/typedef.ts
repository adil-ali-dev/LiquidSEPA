export enum TxStatus {
  LIMIT_REACHED = 'Limit_REACHED'
}

export type RfqStatusVariables = {
  rfqId: string;
};

export type TxStatusVariables = {
  txId: string;
};

export type RfqStatusData = {
  rfqStatus: {
    data: {
      entity_id: null;
      direction: 'buy' | 'sel';
      deposit_reference: string;
      instrument_id_2: string;
      instrument_id_1: string;
      id: string;
      confirm: boolean;
      payout_amount: string;
      payout_account_owner: string;
      rfq_id: string;
      status: TxStatus;
      account_id: null | string;
      refund_address: null | string;
      deposit_amount: string;
      matched: boolean;
      created: string;
      payout_address: string;
      payout_iban: string;
      depositor_iban: string;
      depositor_name: string;
      status_message: null | string;
      tx_id: null | string;
      settled: string;
    };
  };
};

export type TxStatusData = {
  txStatus: {
    data: {
      confs: number;
      unblinded_link: string;
    }
  }
};
