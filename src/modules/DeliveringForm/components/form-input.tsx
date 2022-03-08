import React, { memo } from 'react';
import { Grid, InputBase, InputLabel, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from '../style';
import { FormInputProps } from '../typedef';
import { DoneIcon } from '../../../assets/Icons';

export const FormInput = memo<FormInputProps>(({
  label,
  value,
  error,
  autoFocus,
  reference,
  withExtraProps,
  rowsMax,
  background,
  placeholder,
  handleChange,
  handleKeyDown
}) => {
  const classes = useStyles();

  const inputId = `input-${ label }`;
  const className = clsx(
    classes.formGroup,
    withExtraProps && classes.formGroupFixedHeight,
    classes.formGroupSpace,
    rowsMax && classes.formGroupMedium,
    withExtraProps && classes.formGroupLong,
    error && classes.formGroupError,
    background && classes.formGroupBackground
  );

  return (
    <Grid className={ className }>
      <Grid>
        <InputLabel className={ clsx(classes.commonLabel) } htmlFor={ inputId }>
          { label }
        </InputLabel>
        <InputBase
          className={
            clsx(
              classes.formGroupInput,
              withExtraProps && classes.formGroupInputLong,
              rowsMax && classes.formGroupInputMedium
            )
          }
          id={ inputId }
          placeholder={placeholder}
          value={ value }
          inputRef={ reference }
          onChange={ handleChange }
          onKeyDown={ handleKeyDown }
          autoFocus={ autoFocus }
          { ...withExtraProps && {
            multiline: true,
            rowsMax: rowsMax || 5
          } }
        />
      </Grid>
    </Grid>
  );
});
