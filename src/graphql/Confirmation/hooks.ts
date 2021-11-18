import { useMutation } from '@apollo/client';

import { ConfirmationData, ConfirmationVariables } from './typedef';
import { CONFIRM } from './queries';

export const useConfirmation = () => {
  const [createConfirmation, { data, ...result }] = useMutation<ConfirmationData, ConfirmationVariables>(CONFIRM);

  const confirm = (id: string) => {
    createConfirmation({ variables: { confirm: true, rfqId: id } });
  };

  return { ...result, data: data?.confirmRfq, confirm };
};
