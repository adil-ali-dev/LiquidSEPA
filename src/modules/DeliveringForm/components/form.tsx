import React, { FC, memo } from 'react';
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import { isMobile } from 'react-device-detect';

import { FormProps } from '../typedef';
import { useStyles } from '../style';
import { SwapArrowsIcon } from '../../../assets/Icons';
import { FormInput } from './form-input';
import { FormGroup } from './form-group';
import { ConverterService } from '../../../services';
import { Dropdown } from '../../../components/Dropdown';

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
  address,
  selectOpened,
  textAreaRef,
  isLoggedIn,
  handleSwapClick,
  handleDeliverChange,
  handleInputChange,
  handleContinueClick,
  handleSelectPress,
  handleAddPress,
  handleEnterTextAreaPress,
  handleChooseAccount
}) => {
  const classes = useStyles();

  const account = iban.value || address.value

  const renderContent = () => {
    return sellSide ? (
      <Dropdown
        label="Your receiving IBAN account"
        value={iban.value}
        error={iban.value.length >= 14 && !!iban.error}
        verified={!!iban.value.length && !iban.error && ibanVerified}
        selectOpened={selectOpened}
        withExtraProps
        autoFocus={!isMobile && !!deliver.amount}
        handleChange={handleInputChange}
        handleSelectPress={handleSelectPress}
        handleAddPress={handleAddPress}
        account={account}
        handleChooseAccount={handleChooseAccount}
      />
    ) : (
      <Dropdown
        label="Your receiving Liquid address"
        value={address.value}
        error={!!address.value && !!address.error}
        selectOpened={selectOpened}
        withExtraProps
        autoFocus={!isMobile && !!deliver.amount}
        handleChange={handleInputChange}
        handleSelectPress={handleSelectPress}
        handleAddPress={handleAddPress}
        account={account}
        handleChooseAccount={handleChooseAccount}
      />
    );
  }

  return (
    <form className={classes.form} ref={formRef} onSubmit={handleContinueClick}>
      <Grid>
        <FormGroup
          label="Deliver"
          product={deliver}
          editable
          handleDeliverChange={handleDeliverChange}
          handleSwapClick={handleSwapClick}
        />
        <Grid className={classes.swapContainer}>
          <Button
            className={classes.swapButton}
            variant="contained"
            color="primary"
            onClick={handleSwapClick}
          >
            <SwapArrowsIcon className={classes.swapButtonIcon} />
          </Button>
          <Typography className={classes.swapText}>
            Fee: {ConverterService.separate(fee.toFixed(2), ',')} EUR
          </Typography>
        </Grid>
        <FormGroup
          className={classes.formGroupSpace}
          label="Receive"
          product={receive}
          handleSwapClick={handleSwapClick}
        />
        {renderContent()}
        <Grid className={classes.formErrorContainer}>
          <Typography className={classes.formErrorText}>
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
        className={classes.button}
        disabled={disabled || loading}
        type="submit"
        variant="contained"
        color="primary"
      >
        {loading ? <CircularProgress className={classes.buttonIndicator} color="inherit" size={21} /> : 'Continue'}
      </Button>
    </form>
  );
});
