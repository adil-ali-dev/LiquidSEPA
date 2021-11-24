import React, { ChangeEvent, FC, KeyboardEvent, ReactNode } from 'react'

import { Bank, Country } from '../../graphql/Nordigen/typedef'

export type DropdownProps = {
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
  data: any[];
  checkSelected?: (item: any) => boolean;
  renderItem: (item: any, idx: number) => ReactNode;
  handleItemSelect: (item: any) => void;
  keyExtractor: (item: any) => string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddClick: () => void;
};

export type DropdownContentProps = {
  open: boolean;
  data: any[];
  className?: string;
  emptyText: string;
  loginRequired?: boolean;
  headerText?: string;
  handleAddClick?: () => void;
  checkSelected?: (item: any) => boolean;
  close: () => void;
  renderItem: (item: any, idx: number) => ReactNode;
  keyExtractor: (item: any) => string;
  handleItemSelect: (item: any) => void;
  renderHeader?: () => ReactNode;
};

export type DropdownAlertProps = {
  text: string;
  buttonText?: string;
  handleButtonClick?: () => void;
};

export type DropdownHeaderProps = {
  text: string;
  close: () => void;
  buttonText?: null | string;
  handleButtonClick?: () => void;
};

export type AccountListItem = {
  label: string;
  value: string;
};
