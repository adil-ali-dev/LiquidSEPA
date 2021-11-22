import React, { ChangeEvent, memo, ReactNode, useEffect, useState } from 'react';
import { Button, Grid, InputBase, InputLabel, TextField, TextFieldProps, Typography } from '@material-ui/core';
import clsx from 'clsx';
// @ts-ignore
import Flag from 'react-country-flag';

import { Props } from './typedef';
import { useStyles } from './style';
import { DropdownContent } from '../Dropdown';
import { Bank, Country } from '../../graphql/Nordigen/typedef';

export const Autocomplete = memo<Props>(({
  className,
  options,
  label,
  value,
  type,
  renderOption,
  optionsLoading,
  handleChange,
  getOptionLabel
}) => {
  const classes = useStyles();

  const [showDropdown, setShowDropdown] = useState(false);
  const [text, setText] = useState(value?.name || '')

  useEffect(() => {
    setText(value?.name)
  }, [value?.name])

  const _handleChange = (item: Bank | Country) => {
    setShowDropdown(false)
    handleChange(item)
  }

  const renderCountry = (option: Country) => (
    <Button
      onClick={() => _handleChange(option)}
      className={classes.modalInfoOption}
      key={option.code}
    >
      <Grid className={classes.modalFlag}>
        <Flag style={{ width: 28, height: 28, borderRadius: 8 }} countryCode={option.code} svg />
      </Grid>
      <Typography className={classes.modalInfoOptionLabel}>
        {option.name}
      </Typography>
    </Button>
  );

  const renderBank = (option: Bank) => (
    <Grid className={classes.modalInfoOption} key={option.id}>
      <img
        className={clsx(classes.modalInfoOptionIcon, classes.bankIcon)}
        src={option.logo}
        alt={option.name}
      />
      <Typography className={classes.modalInfoOptionLabel}>
        {option.name}
      </Typography>
    </Grid>
  );

  const handleSetText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  const handleFocus = () => setShowDropdown(true)

  const renderList = () => {
    const filtered = options.filter(opt => opt?.name?.toLowerCase().includes(text.toLowerCase())) || options

    if (type === 'country') {
      return filtered.map(opt => renderCountry(opt))
    } else {
      return filtered.map(opt => renderBank(opt))
    };
  }

  const inputId = `input-${label}`;

  console.log(value)

  return (
    <Grid className={clsx(classes.formGroup, className)}>
      <InputLabel className={classes.label} htmlFor={inputId}>
        {label}
      </InputLabel>
      <InputBase
        className={classes.input}
        id={inputId}
        placeholder="Select"
        value={text}
        //@ts-ignore
        onChange={handleSetText}
        onFocus={handleFocus}
      />

      <DropdownContent
        className={classes.popup}
        show={showDropdown}
        list={options}
        listType="country"
        renderList={renderList}
      />
    </Grid>
  );
});
