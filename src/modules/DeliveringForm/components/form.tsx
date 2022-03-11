import React, { FC, memo } from 'react';
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core';

import { BankAccount, Address } from '../../../typedef';
import { FormProps } from '../typedef';
import { ConverterService } from '../../../services';
import { Dropdown } from '../../../components/Dropdown';
import { Account } from '../../../components/Account';
import { FormGroup } from './form-group';
import { SwapArrowsIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

const keyExtractor = (item: BankAccount | Address) => item.acctNum;

export const Form = memo<FormProps>(({
  deliverInputRef,
  formRef,
  sellSide,
  disabled,
  loading,
  deliver,
  fee,
  receive,
  account,
  address,
  isLoggedIn,
  addresses,
  accounts,
  handleSwapClick,
  handleDeliverChange,
  handleContinueClick,
  handleAddPress,
  handleAddressSelect,
  handleAccountSelect,
  handleDropdownExited
}) => {
  const classes = useStyles();

  const renderDropDownItem = (item: BankAccount | Address, idx: number, active = false) => (
    <Account value={ item } idx={ idx } active={ active } />
  );

  const renderContent = () => {
    return sellSide ? (
      <Dropdown
        label="Your receiving IBAN account"
        placeholder="Chose account"
        emptyText="You do not have any accounts"
        value={ account }
        withExtraProps
        handleAddClick={ handleAddPress }
        loginRequired
        notEditable
        disabled
        handleItemSelect={ handleAccountSelect }
        keyExtractor={ keyExtractor }
        renderItem={ renderDropDownItem }
        handleExited={ handleDropdownExited }
        rowsMax={ 5 }
        data={ accounts }
      />
    ) : (
      <Dropdown
        label="Your receiving Liquid address"
        placeholder="Chose address"
        emptyText="You do not have any addresses"
        value={ address }
        withExtraProps
        handleAddClick={ handleAddPress }
        loginRequired
        notEditable
        disabled
        handleItemSelect={ handleAddressSelect }
        keyExtractor={ keyExtractor }
        renderItem={ renderDropDownItem }
        handleExited={ handleDropdownExited }
        rowsMax={ 5 }
        data={ addresses }
      />
    );
  }

  return (
    <form className={classes.form} ref={formRef} onSubmit={handleContinueClick}>
      <Grid>
        <FormGroup
          label="Deliver"
          product={ deliver }
          reference={ deliverInputRef }
          editable={ isLoggedIn }
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
            <SwapArrowsIcon className={ classes.swapButtonIcon } />
          </Button>
          <Typography className={ classes.swapText }>
            Fee: { ConverterService.separate(fee.toFixed(2), ',') } EUR
          </Typography>
        </Grid>
        <FormGroup
          className={ classes.formGroupSpace }
          label="Receive"
          editable={ false }
          product={ receive }
          handleSwapClick={ handleSwapClick }
        />
        { renderContent() }
      </Grid>
      <Button
        className={ classes.button }
        // disabled={ isLoggedIn && (disabled || loading) }
        disabled
        type="submit"
        variant="contained"
        color="primary"
      >
        {
          loading
            ? <CircularProgress className={classes.buttonIndicator} color="inherit" size={21} />
            : isLoggedIn ? 'Continue' : 'Login'
        }
      </Button>
    </form>
  );
});
