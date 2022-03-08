import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';

export type WrappedProps = {
  status: boolean;
  label: string;
  address: string;
  addressValid: boolean;
  loading: boolean;
  disabled: boolean;
  handleClose?: () => void;
  handleExited?: () => void;
  handleLabelChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddressKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event?: FormEvent<HTMLFormElement>) => void;
};
