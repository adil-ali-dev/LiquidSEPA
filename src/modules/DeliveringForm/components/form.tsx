import React, { FC, memo } from 'react';
import { Button, Grid, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import clsx from 'clsx';

import { FormProps } from '../typedef';
import { useStyles } from '../style';
import { SwapArrowsIcon } from '../../../assets/Icons';
import { FormInput } from './form-input';
import { FormGroup } from './form-group';
import { ConverterService } from '../../../services';

export const Form = memo<FormProps>(({
  formRef,
  sellSide,
  disabled,
  loading,
  deliver,
  fee,
  receive,
  iban,
  ibanVerified,
  accountSelectRef,
  address,
  selectOpened,
  handleSwapClick,
  handleDeliverChange,
  handleInputChange,
  handleContinueClick,
  handleSelectPress,
  handleAddPress
}) => {
  const classes = useStyles();

  return (
    <form className={ classes.form } ref={ formRef } onSubmit={ handleContinueClick }>
      <Grid>
        <FormGroup
          label="Deliver"
          product={ deliver }
          editable
          handleDeliverChange={ handleDeliverChange }
          handleSwapClick={ handleSwapClick }
        />
        <Grid className={ classes.swapContainer }>
          <Button
            className={ classes.swapButton }
            variant="contained"
            color="primary"
            onClick={ handleSwapClick }
          >
            <SwapArrowsIcon className={ classes.swapButtonIcon }/>
          </Button>
          <Typography className={ classes.swapText }>
            Fee: { ConverterService.separate(fee.toFixed(2), ',') } EUR
          </Typography>
        </Grid>
        <FormGroup
          className={ classes.formGroupSpace }
          label="Receive"
          product={ receive }
          handleSwapClick={ handleSwapClick }
        />

        <Grid className={ classes.separator }/>

        {
          sellSide ? (
            <FormInput
              label="Your receiving IBAN account"
              value={ iban.value }
              error={ iban.value.length >= 14 && !!iban.error }
              verified={ !!iban.value.length && !iban.error && ibanVerified }
              selectOpened={ selectOpened }
              withExtraProps
              autoFocus={ !isMobile && !!deliver.amount }
              handleChange={ handleInputChange }
              handleSelectPress={ handleSelectPress }
              handleAddPress={ handleAddPress }
            />
          ) : (
            <FormInput
              label="Your receiving Liquid address"
              value={ address.value }
              error={ !!address.value && !!address.error }
              selectOpened={ selectOpened }
              withExtraProps
              reference={ accountSelectRef }
              autoFocus={ !isMobile && !!deliver.amount }
              handleChange={ handleInputChange }
              handleSelectPress={ handleSelectPress }
              handleAddPress={ handleAddPress }
            />
          )
        }

        <Grid className={ classes.formErrorContainer }>
          <Typography className={ classes.formErrorText }>
            {
              (sellSide
                ? iban.value.length >= 14 && iban.error
                : address.value && address.error
              ) || deliver.error
            }
          </Typography>
        </Grid>
      </Grid>
      <Button
        className={ classes.button }
        disabled={ disabled || loading }
        type="submit"
        variant="contained"
        color="primary"
      >
        { loading ? <CircularProgress className={ classes.buttonIndicator } color="inherit" size={ 21 }/> : 'Continue' }
      </Button>
    </form>
  );
});
