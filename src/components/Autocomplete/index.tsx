import React, { memo, ReactNode } from 'react';
import { Grid, InputLabel, TextField, TextFieldProps } from '@material-ui/core';
import { Autocomplete as AutocompleteComponent } from '@material-ui/lab';
import clsx from 'clsx';

import { Props } from './typedef';
import { useStyles } from './style';

const renderInput = (props: TextFieldProps): ReactNode => (
  <TextField
    { ...props }
    fullWidth
    hiddenLabel
    variant="outlined"
    placeholder="Select"
  />
);

export const Autocomplete = memo<Props>(({
  className,
  options,
  label,
  value,
  renderOption,
  optionsLoading,
  handleChange,
  getOptionLabel
}) => {
  const classes = useStyles();

  const inputId = `input-${ label }`;
  return (
    <Grid className={ clsx(classes.formGroup, className) }>
      <InputLabel className={ classes.label } htmlFor={ inputId }>
        { label }
      </InputLabel>
      <AutocompleteComponent
        id={ inputId }
        options={ options }
        value={ value }
        loading={ optionsLoading }
        renderInput={ renderInput }
        disableClearable
        renderOption={ renderOption }
        getOptionLabel={ getOptionLabel }
        onChange={ handleChange }
      />
    </Grid>
  );
});
