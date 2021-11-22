import { ChangeEvent, ReactNode } from 'react';

import { Bank, Country } from '../../graphql/Nordigen/typedef';

export type Props = {
  className?: string;
  options: any[];
  optionsLoading?: boolean;
  renderOption?: (option: any) => ReactNode;
  label: string;
  value: null | any;
  type: 'bank' | 'country';
  getOptionLabel: (option: any) => string;
  handleChange: (item: any) => void;
};
