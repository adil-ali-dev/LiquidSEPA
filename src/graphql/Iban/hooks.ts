import { useLazyQuery } from '@apollo/client';

import { IbanData, IbanVariables } from './typedef';
import { CHECK_IBAN } from './queries';

export const useIban = () => {
  const [checkIban, { data, ...rest }] = useLazyQuery<IbanData, IbanVariables>(CHECK_IBAN, { fetchPolicy: 'no-cache' });

  const check = (iban: string) => {
    checkIban({ variables: { iban } });
  };

  return { ...rest, valid: data?.iban.valid ?? null, check };
};
