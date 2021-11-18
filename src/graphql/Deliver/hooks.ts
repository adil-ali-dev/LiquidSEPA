import { useMutation } from '@apollo/client';

import { EurXDepositData, EurXDepositVariables, EurDepositData, EurDepositVariables } from './typedef';
import { DEPOSIT_EUR, DEPOSIT_EURX } from './mutations';

export const useEurXDeliver = () => {
  const [createDeposit, { data, ...result }] = useMutation<EurDepositData, EurDepositVariables>(DEPOSIT_EUR);

  const deliver = (variables: EurDepositVariables) => {
    createDeposit({ variables });
  };

  return { ...result, data: data?.eurRfq, deliver };
};

export const useEurDeliver = () => {
  const [createDeliver, { data, ...result }] = useMutation<EurXDepositData, EurXDepositVariables>(DEPOSIT_EURX);

  const deliver = (variables: EurXDepositVariables) => {
    createDeliver({ variables });
  };

  return { ...result, data: data?.eurXRfq, deliver };
};
