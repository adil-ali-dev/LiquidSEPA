import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import {
  WhitelistData,
  WhitelistVariables,
  WhitelistStatusData,
  WhitelistStatusVariables,
  WhitelistedAddressesData
} from './typedef';
import { FETCH_WHITELIST_ADDRESS_STATUS, FETCH_WHITELISTED_ADDRESSES, WHITELIST_ADDRESS } from './queries';
import { authEidStatusHandler } from '../auth-eid-handler';

const POLL_INTERVAL = 1000;

export const useWhitelistedAddress = (successCb: () => void) => {
  const [whitelistReq, whitelistData] = useMutation<WhitelistData, WhitelistVariables>(WHITELIST_ADDRESS, { fetchPolicy: 'no-cache' });
  const [fetchStatus, statusData] = useLazyQuery<WhitelistStatusData, WhitelistStatusVariables>(FETCH_WHITELIST_ADDRESS_STATUS, {
    pollInterval: POLL_INTERVAL
  });

  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (!whitelistData.data?.authEidSignAddress.requestId) return;

    setWaiting(true);
    fetchStatus({ variables: { requestId: whitelistData.data?.authEidSignAddress.requestId } });
  }, [whitelistData.data?.authEidSignAddress.requestId]);

  useEffect(() => {
    if (!whitelistData.error && !statusData.error) return;

    setWaiting(false);
  }, [whitelistData.error, statusData.error]);

  useEffect(() => {
    if (waiting) return;

    statusData.stopPolling?.();
    statusData.stopPolling?.();
  }, [waiting]);

  useEffect(() => {
    const status = statusData.data?.authEidSignAddressStatus.status;
    if (!status) return;

    const success = () => {
      waiting && setWaiting(false);
      successCb();
    };

    const wait = () => {
      setWaiting(true);
    };

    const failure = () => {
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

export const useWhitelistedAddresses = () => {
  const [fetch, { data, ...rest }] = useLazyQuery<WhitelistedAddressesData>(FETCH_WHITELISTED_ADDRESSES);

  return { ...rest, fetch, addresses: data?.filterAccounts };
};
