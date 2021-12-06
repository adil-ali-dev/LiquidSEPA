import { useMutation } from '@apollo/client';

import { CancelData, CancelVariables } from './typedef';
import { CANCEL_AUTH_EID } from './queries';


export const useAuthEidCancel = () => {
  const [post, data] = useMutation<CancelData, CancelVariables>(CANCEL_AUTH_EID, { fetchPolicy: 'no-cache' });

  const cancel = (requestId?: string) => {
    if (!requestId) return;

    post({ variables: { requestId } });
  };

  return { cancel, cancelled: data.data?.authEidCancel.status };
};
