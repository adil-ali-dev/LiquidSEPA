import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery, useApolloClient } from '@apollo/client';

import { WhitelistData, WhitelistVariables, WhitelistStatusData, WhitelistStatusVariables } from './typedef';
import { FETCH_WHITELIST_ADDRESS_STATUS, WHITELIST_ADDRESS } from './queries';
import { authEidStatusHandler } from '../auth-eid-handler';

const POLL_INTERVAL = 1000;

export const useWhitelistedAddress = () => {
  const [whitelistReq, whitelistData] = useMutation<WhitelistData, WhitelistVariables>(WHITELIST_ADDRESS, { fetchPolicy: 'no-cache' });
  const [fetchStatus, statusData] = useLazyQuery<WhitelistStatusData, WhitelistStatusVariables>(FETCH_WHITELIST_ADDRESS_STATUS, {
    pollInterval: POLL_INTERVAL
  });
  // const apolloClient = useApolloClient();

  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!whitelistData.data?.authEidSignAddress.requestId) return;

    setWaiting(true);
    fetchStatus({ variables: { requestId: whitelistData.data?.authEidSignAddress.requestId } });
  }, [whitelistData.data?.authEidSignAddress.requestId]);

  useEffect(() => {
    if (!whitelistData.error) return;

    setWaiting(false);
  }, [whitelistData.error]);

  useEffect(() => {
    const status = statusData.data?.authEidSignAddressStatus.status;
    if (!status) return;

    const success = () => {
      statusData.stopPolling?.();
      waiting && setWaiting(false);
      // apolloClient.cache.modify({ id: '', fields: {  } })
    };

    const wait = () => {
      setWaiting(true);
    };

    const failure = () => {
      statusData.stopPolling?.();
      waiting && setWaiting(false);
      // TODO: add some action on timout
    };

    authEidStatusHandler(status, [success, wait, failure]);
  }, [statusData.data?.authEidSignAddressStatus.status]);

  const whitelistAddress = (variables: WhitelistVariables) => {
    // eslint-disable-next-line no-console
    whitelistReq({ variables }).catch(e => console.log(e));
  };

  return {
    ...whitelistData,
    data: whitelistData.data?.authEidSignAddress,
    requestId: whitelistData.data?.authEidSignAddress.requestId,
    waiting,
    whitelistAddress
  };
};

// export const useWhitelistedAddresses = () => {
//   const {} = useQuery('');
// };
