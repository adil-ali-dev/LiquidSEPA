import React, { FC, useEffect } from 'react';
import { Button, CircularProgress, Grid, InputBase, InputLabel, Typography } from '@material-ui/core';
// @ts-ignore
import Flag from 'react-country-flag';
import clsx from 'clsx';

import { Autocomplete } from '../../../components/Autocomplete';
import { FormInput } from '../../DeliveringForm/components/form-input';
import { useStyles } from '../style';
import { ModalNordigenLoggedinProps } from '../typedef';
import nordigenCountries from '../../../constants/nordigen-countries';
import { Bank } from '../../../graphql/Nordigen/typedef';

export const ModalNordigenLoggedin: FC<ModalNordigenLoggedinProps> = ({
  modalType,
  final,
  error,
  loading,
  banks,
  address,
  bank,
  handleCountryChange,
  handleBankChange,
  handleAddressChange,
  handleModalSubmit
}) => {
  const classes = useStyles();

  useEffect(() => {
    handleCountryChange(null, nordigenCountries[0]);
  }, []);

  const renderCountry = (option: {
    code: string,
    name: string
  }) => (
    <Grid className={ classes.modalInfoOption }>
      <Grid className={ classes.modalFlag }>
        <Flag style={ classes.modalFlagItem } countryCode={ option.code } svg/>
      </Grid>
      <Typography className={ classes.modalInfoOptionLabel }>
        { option.name }
      </Typography>
    </Grid>
  );

  const renderBank = (option: Bank) => (
    <Grid className={ classes.modalInfoOption }>
      <img className={ classes.modalInfoOptionIcon } src={ option.logo } alt={ option.name }/>
      <Typography className={ classes.modalInfoOptionLabel }>
        { option.name }
      </Typography>
    </Grid>
  );

  return (
    <Grid className={ classes.modal }>
      { modalType === 'account'
        ? (
          <>
            <Typography className={ classes.modalHeadline }>
              Add bank account
            </Typography>
            <Autocomplete
              className={ classes.modalInfoBank }
              optionsLoading={ loading }
              options={ nordigenCountries }
              handleChange={ handleCountryChange }
              value={ nordigenCountries[0] }
              renderOption={ renderCountry }
              label="Choose your country"
              getOptionLabel={ option => option.name }
            />

            <Autocomplete
              className={ classes.modalInfoBank }
              optionsLoading={ loading }
              options={ banks || [] }
              handleChange={ handleBankChange }
              value={ bank }
              renderOption={ renderBank }
              label="Choose your bank"
              getOptionLabel={ option => option.name }
            />
          </>
        )

        : (
          <>
            <Typography className={ classes.modalHeadline }>
              Add a liquid address acccount
            </Typography>

            <Grid
              className={ classes.formGroup }
              style={{ cursor: 'pointer' }}
            >
              <InputLabel className={ classes.commonLabel } htmlFor="label-input">
                Label
              </InputLabel>
              <Grid className={ classes.formGroupRow }>
                <InputBase
                  id="label-input"
                  // className={ classes.formGroupText }
                  // value="Name of account"
                  autoFocus
                // inputProps={{ className: classes.formGroupTextInput }}
                // onChange={ handleDeliverChange }
                />
              </Grid>
            </Grid>

            <FormInput
              label="Your receiving Liquid address"
              value={ address }
              withExtraProps
              background
              rowsMax={ 3 }
              handleChange={ handleAddressChange }
            // handleEnterTextAreaPress={handleEnterTextAreaPress}
            />
          </>
        ) }

      <Button
        className={ clsx(classes.button, classes.modalFooterButton) }
        type="submit"
        variant="contained"
        color="primary"
        onClick={ handleModalSubmit }
      >
        {
          loading || (final && !error)
            ? <CircularProgress className={ classes.buttonIndicator } color="inherit" size={ 21 }/>
            : (modalType === 'account' ? 'Add account' : 'Whitelist adress')
        }
      </Button>
    </Grid>
  );
};
