import React from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
// @ts-ignore
import Flag from 'react-country-flag';

import { useStyles } from './style';
import { Modal } from '../../components/Modal';
import clsx from 'clsx';
import { withBankAccountDomain } from './domain';
import { Autocomplete } from '../../components/Autocomplete';
import { Bank, Country } from '../../graphql/Nordigen/typedef';

export const BankAccountModule = withBankAccountDomain(({
  children,
  country,
  bank,
  loading,
  banks,
  banksLoading,
  disabled,
  countries,
  handleCountryChange,
  handleBankChange,
  handleSubmit,
  ...modalProps
}) => {
  const classes = useStyles();

  const renderCountry = (option: Country) => (
    <>
      <Grid className={ classes.modalFlag }>
        <Flag className={ classes.modalFlagIcon } countryCode={ option.code } svg />
      </Grid>
      <Typography className={classes.modalInfoOptionLabel}>
        { option.name }
      </Typography>
    </>
  );

  const renderBank = (option: Bank) => (
    <Grid className={ classes.modalInfoOption }>
      <img
        className={ clsx(classes.modalInfoOptionIcon, classes.bankIcon) }
        src={ option.logo }
        alt={ option.name }
      />
      <Grid>
        <Typography className={ classes.modalInfoOptionLabel }>
          { option.name }
        </Typography>
        <Typography className={ classes.modalInfoOptionSubLabel }>
          { option.bic }
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Modal { ...modalProps }>
      <Grid className={ classes.modal }>

            <form onSubmit={handleSubmit}>
              <Typography className={ classes.modalHeadline }>
                Add Account
              </Typography>

              <Grid className={ classes.modalContent }>
                <Autocomplete
                  emptyText="No Countries"
                  label="Country"
                  placeholder="Chose country"
                  options={ countries }
                  autoFocus
                  value={ country }
                  getOptionLabel={ i => i.name }
                  renderOption={ renderCountry }
                  handleChange={ handleCountryChange }
                />

                <Autocomplete
                  className={ classes.inputSpace }
                  emptyText="No Banks"
                  optionsLoading={ banksLoading }
                  label="Bank"
                  placeholder="Chose bank"
                  options={ banks }
                  value={ bank }
                  getOptionLabel={ i => i.name }
                  renderOption={ renderBank }
                  handleChange={ handleBankChange }
                />
              </Grid>

              <Button
                className={ clsx(classes.button, classes.modalFooterButton) }
                type="submit"
                variant="contained"
                disabled={ disabled }
                color="primary"
              >
                {
                  loading
                    ? <CircularProgress className={ classes.buttonIndicator } color="inherit" size={ 21 }/>
                    : 'Add Account'
                }
              </Button>
            </form>
      </Grid>
    </Modal>
  );
});
