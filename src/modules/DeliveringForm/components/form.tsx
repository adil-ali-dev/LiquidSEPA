import React, { FC, memo } from 'react';
import { Button, Grid, Typography, CircularProgress, ButtonBase } from '@material-ui/core';
import { isMobile } from 'react-device-detect';

import { FormProps } from '../typedef';
import { useStyles } from '../style';
import { SwapArrowsIcon } from '../../../assets/Icons';
import { FormGroup } from './form-group';
import { ConverterService, IbanService } from '../../../services';
import { Dropdown } from '../../../components/Dropdown';
import { BankAccount } from '../../../graphql/BankAccount/typedef';
import { WhitelistedAddress } from '../../../graphql/WhitelistAddress/typedef';

const keyExtractor = (item: WhitelistedAddress | BankAccount) => item.acct_num;

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
  isLoggedIn,
  textAreaRef,
  addresses,
  accounts,
  handleSwapClick,
  handleDeliverChange,
  handleContinueClick,
  handleAddPress,
  handleAddressSelect,
  handleAccountSelect
}) => {
  const classes = useStyles();

  const renderDropDownItem = (item: BankAccount | WhitelistedAddress, idx: number) => {
    const isBank = item.type === 'Bank';

    return (
      <Grid className={ classes.listItemTextWrap }>
        <Typography className={ classes.listItemHeading }>
          { isBank ? `Account ${ idx + 1 }` : item.name }
        </Typography>
        <Typography className={ classes.listItemText }>
          { isBank ? IbanService.format(item.name) : item.acct_num }
        </Typography>
      </Grid>
    );
  }

  const renderContent = () => {
    return sellSide ? (
      <Dropdown
        label="Your receiving IBAN account"
        placeholder="Chose account"
        emptyText="You do not have any accounts"
        value={ iban.value }
        error={ iban.value.length >= 14 && !!iban.error }
        withExtraProps
        handleAddClick={ handleAddPress }
        loginRequired
        notEditable
        handleItemSelect={ handleAccountSelect }
        keyExtractor={ keyExtractor }
        renderItem={ renderDropDownItem }
        rowsMax={ 5 }
        data={ accounts }
      />
    ) : (
      <Dropdown
        label="Your receiving Liquid address"
        placeholder="Chose address"
        emptyText="You do not have any addresses"
        value={ address.value }
        error={ !!address.value && !!address.error }
        withExtraProps
        handleAddClick={ handleAddPress }
        loginRequired
        notEditable
        handleItemSelect={ handleAddressSelect }
        keyExtractor={ keyExtractor }
        renderItem={ renderDropDownItem }
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
          product={deliver}
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
            Fee: {ConverterService.separate(fee.toFixed(2), ',')} EUR
          </Typography>
        </Grid>
        <FormGroup
          className={ classes.formGroupSpace }
          label="Receive"
          product={ receive }
          handleSwapClick={ handleSwapClick }
        />
        { renderContent() }
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
        disabled={ isLoggedIn && (disabled || loading) }
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
