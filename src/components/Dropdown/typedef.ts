import React, { ChangeEvent, FC, ReactNode } from 'react'

export type DropdownProps = {
  background?: boolean;
  label: string;
  value: any;
  error?: boolean;
  autoFocus?: boolean;
  rowsMax?: number;
  withExtraProps?: boolean;
  placeholder: string;
  emptyText: string;
  loginRequired?: boolean;
  notEditable?: boolean;
  headerText?: string;
  data: any[];
  checkSelected?: (item: any) => boolean;
  renderItem: (item: any, idx: number, active?: boolean) => ReactNode;
  handleItemSelect: (item: any) => void;
  keyExtractor: (item: any) => string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddClick: () => void;
};

export type DropdownContentProps = {
  open: boolean;
  data: any[];
  className?: string;
  emptyText: string;
  loginRequired?: boolean;
  headerText?: string;
  checkSelected?: (item: any) => boolean;
  close: () => void;
  renderItem: (item: any, idx: number, active?: boolean) => ReactNode;
  keyExtractor: (item: any) => string;
  handleItemSelect: (item: any) => void;
  renderHeader?: () => ReactNode;
  handleAddClick?: () => void;
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
