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
import { Autocomplete } from '../../../components/Autocomplete';

export const Form = memo<FormProps>(({
  formRef,
  sellSide,
  disabled,
  loading,
  deliver,
  fee,
  receive,
  iban,
  address,
  textAreaRef,
  isLoggedIn,
  handleSwapClick,
  handleDeliverChange,
  handleInputChange,
  handleContinueClick,
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
        placeholder="Chose account"
        emptyText="You do not have any accounts"
        value={iban.value}
        error={iban.value.length >= 14 && !!iban.error}
        withExtraProps
        autoFocus={!isMobile && !!deliver.amount}
        handleChange={handleInputChange}
        handleAddClick={handleAddPress}
        loginRequired
        rowsMax={5}
        data={[]}
        handleSelect={() => null}
      />
    ) : (
      <Dropdown
        label="Your receiving Liquid address"
        placeholder="Chose address"
        emptyText="You do not have any addresses"
        value={address.value}
        error={!!address.value && !!address.error}
        withExtraProps
        autoFocus={!isMobile && !!deliver.amount}
        handleChange={handleInputChange}
        handleAddClick={handleAddPress}
        loginRequired
        rowsMax={5}
        data={[]}
        handleSelect={() => null}
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
