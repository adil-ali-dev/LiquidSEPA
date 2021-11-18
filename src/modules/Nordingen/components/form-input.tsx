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
  verified,
  handleChange,
  handleEnterTextAreaPress
}) => {
  const classes = useStyles();

  const inputId = `input-${ label }`;
  const className = clsx(
    classes.formGroup,
    classes.formGroupFixedHeight,
    classes.formGroupSpace,
    withExtraProps && classes.formGroupLong,
    rowsMax && classes.formGroupMedium,
    error && classes.formGroupError,
    verified && classes.formGroupPlate
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
          value={ value }
          inputRef={ reference }
          onChange={ handleChange }
          autoFocus={ autoFocus }
          { ...withExtraProps && {
            multiline: true,
            rowsMax: rowsMax || verified ? 4 : 5,
            onKeyDown: handleEnterTextAreaPress
          } }
        />
      </Grid>
      {
        verified && (
          <Grid className={ classes.formGroupPlateVerifiedContainer }>
            <DoneIcon className={ classes.formGroupPlateVerifiedIcon }/>
            <Typography className={ classes.formGroupPlateVerifiedText }>
              Verified
            </Typography>
          </Grid>
        )
      }
    </Grid>
  );
});
