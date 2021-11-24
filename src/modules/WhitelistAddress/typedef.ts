import { ChangeEvent, FormEvent } from 'react';

export type Props = {
  status: boolean;
  label: string;
  address: string;
  loading: boolean;
  disabled: boolean;
  handleClose: () => void;
  handleLabelChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddressChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
