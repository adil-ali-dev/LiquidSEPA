import { ChangeEvent, FormEvent } from 'react';

import { SupportedBank, Country } from '../../typedef';


export type Props = {
  status: boolean;
  country: null | Country;
  bank: null | SupportedBank;
  banksLoading: boolean;
  banks: SupportedBank[];
  countries: Country[];
  loading: boolean;
  disabled: boolean;
  handleClose?: () => void;
  handleCountryChange: (_: ChangeEvent<Record<string, unknown>>, value: null | Country) => void;
  handleBankChange: (_: ChangeEvent<Record<string, unknown>>, value: null | SupportedBank) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
