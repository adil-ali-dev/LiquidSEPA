import React, { ChangeEvent, FormEvent, ReactNode, ReactNodeArray } from 'react';
import { Bank, Country } from '../../graphql/Nordigen/typedef';

export type Props = {
  modalStatus: boolean
  children: ReactNode
  handleModalCloseClick: () => void
};

export type ModalHeaderProps = {
  iban?: string
  step: number
  error: boolean
  completed: boolean
};

export type ModalInfoProps = {
  error: boolean
  headline: string
  message: string
  optionsLoading: boolean
  options: Bank[]
  bankSelected: boolean
  final: boolean
  completed: boolean
  bank: null | Bank
  handleChange: (event: ChangeEvent<Record<string, unknown>>, value: null | Bank) => void
};

export type ModalFooterProps = {
  loading: boolean
  disabled: boolean
  bankSelected: boolean
  final: boolean
  error: boolean
  completed: boolean
  address: string
  step: number
};

export type ModalFormProps = ModalHeaderProps &
ModalFooterProps & {
  children: ReactNode | ReactNodeArray
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
};

export type CreatedAccount = {
  iban: string
  name: string
};
export type ModalNordigenLoggedinProps = {
  modalType: string
  final: boolean
  error: boolean
  loading: boolean
  banks: Bank[]
  bank: Bank | null
  address: string
  handleCountryChange: (event: ChangeEvent<Record<string, unknown>> | null, value: null | Country) => void
  handleBankChange: (event: ChangeEvent<Record<string, unknown>>, value: null | Bank) => void
  handleAddressChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleModalSubmit: () => void
};
