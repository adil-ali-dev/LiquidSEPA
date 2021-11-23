import React, { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react'

import { Bank, Country } from '../../graphql/Nordigen/typedef'

export type DropdownProps<T> = {
  background?: boolean;
  label: string;
  value: string;
  error?: boolean;
  autoFocus?: boolean;
  rowsMax?: number;
  withExtraProps?: boolean;
  placeholder: string;
  emptyText: string;
  loginRequired?: boolean;
  headerText?: string;
  data: T[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEnterTextAreaPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  handleAddClick: () => void;
  handleSelect: (item: T) => void;
};

export type DropdownContentProps<T> = {
  open: boolean;
  data: T[];
  className?: string;
  emptyText: string;
  loginRequired?: boolean;
  headerText?: string;
  handleAddClick?: () => void;
  handleItemClick?: (item: T) => void;
  handleButtonClick?: () => void;
  renderItem?: (item: T) => ReactNode;
  renderHeader?: () => ReactNode;
};

export type DropdownAlertProps = {
  text: string;
  buttonText?: string;
  handleButtonClick?: () => void;
};

export type DropdownHeaderProps = {
  text: string;
  buttonText?: null | string;
  handleButtonClick?: () => void;
};

export type AccountListItem = {
  label: string;
  value: string;
};
