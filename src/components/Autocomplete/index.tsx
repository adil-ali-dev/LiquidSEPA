import React, { memo } from 'react';
import { Grid, InputLabel, TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete as AutocompleteComponent } from '@material-ui/lab';
import clsx from 'clsx';

import { Props } from './typedef';
import { useStyles } from './styles';
import { AutocompleteAlert } from './autocomplete-alert';

const renderInput = (props: TextFieldProps) => (
  <TextField
    { ...props }
    fullWidth
    hiddenLabel
    variant="outlined"
    placeholder={ props.placeholder || 'Chose' }
  />
);

export const Autocomplete = memo<Props>(({
  className,
  options,
  label,
  value,
  placeholder,
  emptyText,
  renderOption,
  optionsLoading,
  handleChange,
  autoFocus,
  getOptionLabel
}) => {
  const classes = useStyles();
  const inputId = `input-${label}`;

  return (
    <Grid className={ clsx(classes.formGroup, className) }>
      <InputLabel className={ classes.label } htmlFor={ inputId }>
        { label }
      </InputLabel>
      <AutocompleteComponent
        id={ inputId }
        options={ options }
        value={ value }
        placeholder={ placeholder }
        openOnFocus
        loadingText={
          <AutocompleteAlert text="Loading..."/>
        }
        noOptionsText={
          <AutocompleteAlert text={emptyText} />
        }
        loading={ optionsLoading }
        renderInput={ props => renderInput({ ...props, placeholder, autoFocus: autoFocus && !value }) }
        disableClearable
        renderOption={ renderOption }
        getOptionLabel={ getOptionLabel }
        onChange={ handleChange }
      />
    </Grid>
  );
});
