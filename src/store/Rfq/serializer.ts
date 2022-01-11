import { RfqEstimation } from '../../typedef';


export const serializeEstimation = (estimation: RfqEstimation<string>): RfqEstimation<number> => ({
  charge: Number(estimation.charge),
  payoutEstimation: Number(estimation.payoutEstimation),
  fee: Number(estimation.fee)
});
