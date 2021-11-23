import { ChangeEvent, FormEvent } from 'react';
import { Bank, Country } from '../../graphql/Nordigen/typedef';

export type Props = {
  status: boolean;
  country: null | Country;
  bank: null | Bank;
  banksLoading: boolean;
  banks: Bank[];
  countries: Country[];
  loading: boolean;
  success: boolean;
  disabled: boolean;
  handleClose: () => void;
  handleCountryChange: (_: ChangeEvent<Record<string, unknown>>, value: null | Country) => void;
  handleBankChange: (_: ChangeEvent<Record<string, unknown>>, value: null | Bank) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
