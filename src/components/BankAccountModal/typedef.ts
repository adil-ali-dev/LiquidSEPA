import { ChangeEvent, FormEvent } from 'react';

export type Props = {
  status: boolean;
  country: string;
  bank: string;
  loading: boolean;
  handleClose: () => void;
  handleLabelChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleAddressChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
