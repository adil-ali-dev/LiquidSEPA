import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { FeeData, FeeVariables } from './typedef';
import { ESTIMATE_FEE } from './queries';

export const useFeeEstimation = () => {
  const { data, refetch, ...result } = useQuery<FeeData, FeeVariables>(ESTIMATE_FEE);

  const estimatedFee = useMemo(() => {
    if (!data?.estimate.charge) return 0;

    const { charge, fee } = data.estimate;
    const newFee = charge + fee;

    return charge > 0 ? newFee : 0;
  }, [data?.estimate.charge]);

  const receive = useMemo(() => {
    if (!data?.estimate.payout) return 0;

    const { payout } = data.estimate;

    return payout > 0 ? payout : 0;
  }, [data?.estimate.payout]);

  const estimate = (amount: number) => {
    refetch({ amount });
  };

  return { ...result, data: { ...data?.estimate, fee: estimatedFee, receive }, estimate };
};
