import { Address, BankAccount } from '../../typedef';


export type Props = {
  value: null | BankAccount | Address;
  idx?: number;
  active: boolean;
  cropAddress?: boolean;
};
