import { ChangeEvent, ReactNode } from 'react';


export type Props = {
  className?: string;
  options: any[];
  optionsLoading?: boolean;
  renderOption?: (option: any) => ReactNode;
  emptyText: string;
  placeholder?: string;
  label: string;
  autoFocus?: boolean;
  value: null | any;
  getOptionLabel: (option: any) => string;
  handleChange: (event: ChangeEvent<Record<string, unknown>>, item: any) => void;
};

export type AlertProps = {
  text: string;
  buttonText?: string;
  handleButtonClick?: () => void;
};
