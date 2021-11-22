import { ChangeEvent, KeyboardEvent } from 'react'

import { Bank, Country } from '../../graphql/Nordigen/typedef'

export type DropdownProps = {
  background?: boolean
  label: string
  value: string
  error?: boolean
  autoFocus?: boolean
  verified?: null | boolean
  rowsMax?: number
  withExtraProps?: boolean
  selectOpened: boolean
  account: any
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleEnterTextAreaPress?: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  handleAddPress: (type: string) => void
  handleSelectPress: (state: boolean) => void
  handleChooseAccount: (address: string) => void
}

export type DropdownContentProps = {
  show: boolean
  list: AccountListItem[] | Country[] | Bank[]
  listType: 'account' | 'address' | 'bank' | 'country'
  handleAddPress?: (type: string) => void
  handleItemPress: (v: string) => void
}

export type AccountListItem = {
  label: string
  xbtAddress: string
}
