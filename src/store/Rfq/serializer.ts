import { RfqData, RfqEstimation } from '../../typedef';


export const serializeEstimation = (estimation: RfqEstimation<string>): RfqEstimation<number> => ({
  charge: Number(estimation.charge),
  payoutEstimation: Number(estimation.payoutEstimation),
  fee: Number(estimation.fee)
});

export const serializeRfq = (rfq: RfqData<string>): RfqData<number> => ({
  ...rfq,
  depositAmount: Number(rfq.depositAmount),
  payoutAmount: Number(rfq.payoutAmount)
});
