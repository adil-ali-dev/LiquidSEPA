import { ChangeEvent, FormEvent, KeyboardEvent, ReactNode, RefObject } from 'react';

import { Currency, BankAccount, Address, RfqConfirmationDetails, RfqPaymentDetails } from '../../typedef';


export type Product = {
  product: Currency;
  amount: number;
  placeholder: string;
  error?: null | string;
};

export type NameOnAccount = {
  value: string;
  error: null | string;
};

export type PaymentProps = {
  paymentDetails: RfqPaymentDetails;
  confirmed: boolean;
  sellSide: boolean;
  confs: number;
  handleTxCopyClick: () => void;
};

export type PaymentHeaderProps = {
  confirmed: boolean;
  children: ReactNode | ReactNode[];
};

export type PaymentDetailsProps = {
  label: string;
  children: ReactNode | ReactNode[];
};

export type PaymentTxIdProps = {
  txId: string;
  link: string;
  handleTxCopyClick: () => void;
};

export type ProductIconProps = {
  className?: string;
  name: string;
};

export type FormProps = {
  deliverInputRef: RefObject<HTMLInputElement>;
  formRef: RefObject<HTMLFormElement>;
  sellSide: boolean;
  disabled: boolean;
  loading: boolean;
  fee: number;
  account: null | BankAccount;
  isLoggedIn: boolean;
  address: null | Address;
  addresses: Address[];
  accounts: BankAccount[];
  textAreaRef: RefObject<HTMLTextAreaElement>;
  deliver: Product;
  receive: Product;
  handleSwapClick: () => void;
  handleDeliverChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleContinueClick: (event: FormEvent<HTMLFormElement>) => void;
  handleAddPress: () => void;
  handleAccountSelect: (item: BankAccount) => void;
  handleAddressSelect: (item: Address) => void;
};

export type FormGroupProps = {
  label: string;
  product: Product;
  className?: string;
  reference?: RefObject<HTMLInputElement>;
  editable?: boolean;
  handleSwapClick: () => void;
  handleDeliverChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type FormInputProps = {
  background?: boolean;
  label: string;
  value: string;
  error?: boolean;
  reference?: RefObject<HTMLTextAreaElement>;
  autoFocus?: boolean;
  placeholder?: string;
  verified?: null | boolean;
  rowsMax?: number;
  withExtraProps?: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEnterTextAreaPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export type FormInputLoggedinProps = {
  background?: boolean;
  label: string;
  value: string;
  error?: boolean;
  autoFocus?: boolean;
  verified?: null | boolean;
  rowsMax?: number;
  withExtraProps?: boolean;
  selectOpened: boolean;
  account: any;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEnterTextAreaPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleAddPress: (type: string) => void
  handleSelectPress: (state: boolean) => void
  handleChooseAccount: (address: string) => void
};

export type RequisitesHeaderProps = {
  sellSide: boolean;
  productName: string;
  amount: number;
  handleBackClick: () => void;
};

export type RequisitesMainProps = {
  sellSide: boolean;
  details: null | RfqConfirmationDetails;
  handleAddressCopyClick: () => void;
  handleIbanCopyClick: () => void;
  handleRefCopyClick: () => void;
};

export type RequisitesFooterProps = {
  sellSide: boolean;
  value: BankAccount | Address;
};

export type RowProps = {
  label: string;
  spaceLarge?: boolean;
  spaceMedium?: boolean;
  spaceSmall?: boolean;
  value?: string | number;
  product?: Currency;
  children?: ReactNode;
};

export type Props = {
  next: boolean;
  widgetRef: RefObject<HTMLDivElement>;
  children: ReactNode;
};

export type AccountListItem = {
  label: string;
  xbtAddress: string;
}
