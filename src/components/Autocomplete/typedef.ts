import { ChangeEvent, ReactNode } from 'react';

export type Props = {
  className?: string;
  options: any[];
  optionsLoading?: boolean;
  renderOption?: (option: any) => ReactNode;
  label: string;
  value: null | any;
  getOptionLabel: (option: any) => string;
  handleChange: (event: ChangeEvent<Record<string, unknown>>, value: null | any) => void;
};
