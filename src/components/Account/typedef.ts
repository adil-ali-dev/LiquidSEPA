import { WhitelistedAddress } from '../../graphql/WhitelistAddress/typedef';
import { BankAccount } from './../../graphql/BankAccount/typedef';


export type Props = {
  value: null | BankAccount | WhitelistedAddress;
  idx?: number;
  active: boolean;
  cropAddress?: boolean;
};
