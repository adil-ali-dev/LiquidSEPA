import { ChangeEvent, FormEvent, KeyboardEvent, ReactNode, MouseEvent, RefObject, ReactNodeArray } from 'react';

import { ProductType } from '../../constants';
import { BankAccount } from '../../graphql/BankAccount/typedef';
import { WhitelistedAddress } from '../../graphql/WhitelistAddress/typedef';

export type Product = {
  product: ProductType;
  amount: number;
  placeholder: string;
  error?: null | string;
};

export type Iban = {
  value: string;
  details?: null | BankAccount;
  error: null | string;
};

export type NameOnAccount = {
  value: string;
  error: null | string;
};

export type Address = {
  value: string;
  details?: null | WhitelistedAddress;
  error: null | string;
};

export type ConfirmationDetails = {
  trackingCode: string;
  rfqId: string;
  appToAppValue?: string;
  qrValue?: string;
};

export type PaymentDetails = {
  txId: string;
  link: string;
  received: {
    amount: number;
    iban?: string;
    nameOnAccount?: string;
  };
  sending: {
    amount: number;
    iban?: string;
    nameOnAccount?: string;
  }
};

export type PaymentProps = {
  paymentDetails: PaymentDetails;
  confirmed: boolean;
  sellSide: boolean;
  confs: number;
  handleTxCopyClick: () => void;
};

export type PaymentHeaderProps = {
  confirmed: boolean;
  sent: boolean;
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
  address: null | WhitelistedAddress;
  addresses: WhitelistedAddress[];
  accounts: BankAccount[];
  textAreaRef: RefObject<HTMLTextAreaElement>;
  deliver: Product;
  receive: Product;
  handleSwapClick: () => void;
  handleDeliverChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleContinueClick: (event: FormEvent<HTMLFormElement>) => void;
  handleAddPress: () => void;
  handleAccountSelect: (item: BankAccount) => void;
  handleAddressSelect: (item: WhitelistedAddress) => void;
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
  details: null | ConfirmationDetails;
  handleAddressCopyClick: () => void;
  handleIbanCopyClick: () => void;
  handleRefCopyClick: () => void;
};

export type RequisitesFooterProps = {
  sellSide: boolean;
  value: BankAccount | WhitelistedAddress;
};

export type RowProps = {
  label: string;
  spaceLarge?: boolean;
  spaceMedium?: boolean;
  spaceSmall?: boolean;
  value?: string | number;
  product?: ProductType;
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
