import { useLazyQuery } from '@apollo/client';

import { RfqStatusData, RfqStatusVariables, TxStatusData, TxStatusVariables } from './typedef';
import { FETCH_RFQ_STATUS, FETCH_TX_STATUS } from './queries';

export const useRfqStatus = () => {
  const [fetchStatus, { data, ...rest }] = useLazyQuery<RfqStatusData, RfqStatusVariables>(FETCH_RFQ_STATUS, {
    pollInterval: 1000
  });

  const fetch = (variables: RfqStatusVariables) => {
    fetchStatus({ variables });
  };

  return { ...rest, fetch, data: data?.rfqStatus.data };
};

export const useTxStatus = () => {
  const [fetchStatus, { data, ...rest }] = useLazyQuery<TxStatusData, TxStatusVariables>(FETCH_TX_STATUS, {
    pollInterval: 1000
  });

  const fetch = (variables: TxStatusVariables) => {
    fetchStatus({ variables });
  };

  return { ...rest, fetch, data: data?.txStatus.data };
};
