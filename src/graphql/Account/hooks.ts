import { useMutation } from '@apollo/client';

import { WhitelistData, WhitelistVariables } from './typedef';
import { WHITELIST_ADDRESS } from './queries';

export const useWhitelistAddress = () => {
  const [whitelistAddress, { data, ...result }] = useMutation<WhitelistData, WhitelistVariables>(WHITELIST_ADDRESS);

  const signUp = (variables: WhitelistVariables) => {
    whitelistAddress({ variables });
  };

  return { ...result, data: data?.authEidSignAddress, signUp };
};
