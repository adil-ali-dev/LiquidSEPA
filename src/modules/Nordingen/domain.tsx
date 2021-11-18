import React, { ChangeEvent, ComponentType, FormEvent, KeyboardEvent, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
// @ts-ignore
import Flag from 'react-country-flag';
import clsx from 'clsx';

import { Button, CircularProgress, Grid, InputBase, InputLabel, Typography } from '@material-ui/core';
import { CreatedAccount, Props } from './typedef';
import { useNordigen } from '../../graphql/Nordigen/hooks';
import { Bank, Country } from '../../graphql/Nordigen/typedef';
import { BitcoinAddressService } from '../../services';
import { useNordigenContext } from '../../contexts/Nordigen';
import { ModalNordigenInfo } from './components/modal-nordigen-info';
import { FormInput } from './components/form-input';
import { ModalNordigenForm } from './components/modal-nordigen-form';
import { useStyles } from './style';
import { ModalNordigenForm1 } from './components/modal-nordigen-form1';
import { Autocomplete } from '../../components/Autocomplete';
import nordigenCountries from '../../constants/nordigen-countries';

const ADDRESS_KEY_NAME = 'address-key';

export const withNordigenDomain = (Component: ComponentType<Props>) => () => {
  const history = useHistory();
  const formRef = useRef<HTMLFormElement>(null);
  const classes = useStyles();

  const [modalStep, setModalStep] = useState(0);
  const [address, setAddress] = useState('');
  const [bank, setBank] = useState<null | Bank>(null);
  const [bankSelected, setBankSelected] = useState(false);
  const [final, setFinal] = useState(false);
  const [error, setError] = useState(false);
  const [account, setAccount] = useState<null | CreatedAccount>(null);
  const [country, setCountry] = useState<Country>(nordigenCountries[0]);

  const { modalStatus, iban, modalControls, setNordigenIban, modalType } = useNordigenContext();
  const nordigen = useNordigen(address);

  useEffect(() => {
    nordigen.getBanksByCountry(country.code);
  }, [country]);

  // const disabled = useMemo(() => {
  //   if (!modalStep) {
  //     return !address;
  //   }

  //   if (modalStep) {
  //     // eslint-disable-next-line no-nested-ternary
  //     return final ? (error ? false : !account) : (!bankSelected && !bank?.id);
  //   }

  //   return false;
  // }, [address, modalStep, bankSelected, final, bank, error, account]);

  // useEffect(() => {
  //   if (!nordigen.account?.iban) return;

  //   setAccount(nordigen.account);
  //   setNordigenIban(nordigen.account.iban);
  // }, [nordigen.account?.iban]);

  // useEffect(() => {
  //   if (!iban || nordigen.banks.length) return;

  //   nordigen.getBanks(iban);
  // }, [iban]);

  // useEffect(() => {
  //   if (error) return;

  //   const nordigenCallbackError = !!new URL(window.location.href).searchParams.get('error');
  //   setError(nordigen.error || nordigenCallbackError);
  // }, [nordigen.error, window.location.search]);

  // useEffect(() => {
  //   if (!window.location.search) return;

  //   const params = new URL(window.location.href).searchParams;
  //   if (!params.get('ref') || !nordigen.reqId) return;

  //   history.replace('');

  //   const cachedAddress = window.localStorage.getItem(ADDRESS_KEY_NAME);
  //   if (cachedAddress) {
  //     setAddress(cachedAddress);
  //     window.localStorage.removeItem(ADDRESS_KEY_NAME);
  //   }

  //   setModalStep(1);
  //   setFinal(true);
  //   modalControls.open();
  //   nordigen.getAccounts(!!params.get('error'));
  // }, [window.location.search]);

  const handleAddressChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    BitcoinAddressService.validate(value, addressError => {
      setAddress(value);
    });
  }, []);

  const handleBankChange = useCallback((event: ChangeEvent<Record<string, unknown>>, value: null | Bank) => {
    if (!value) return;

    setBank(value);
    setBankSelected(true);
    // nordigen.createAgreement(value.id);
  }, []);

  const handleCountryChange =
    (event: ChangeEvent<Record<string, unknown>>, value: null | { code: string, name: string }) => {
      if (!value) return;

      setCountry(value);
    };

  // const handleEnterTextAreaPress = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === 'Enter' && formRef?.current) {
  //     formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  //     event.preventDefault();
  //   }
  // }, []);

  const handleModalCloseClick = useCallback(() => {
    if (nordigen.loading) return;

    modalControls.close();
    // Waiting for closing animation
    setTimeout(() => {
      setAddress('');
      setModalStep(0);
      setFinal(false);
      setError(false);
      setBank(null);
      setBankSelected(false);
      setAccount(null);
    }, 200);
  }, [nordigen.loading]);

  const handleModalSubmit = useCallback(() => {
  // const handleModalSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

    if (!bank || !address) return;

    if (account || error) {
      handleModalCloseClick();
      return;
    }

    if (!modalStep) {
      setModalStep(1);
    } else {
      if (!bankSelected) {
        if (!bank) return;

        setBankSelected(true);
        nordigen.createAgreement(bank.id);
      } else {
        nordigen.link && window.open(nordigen.link, '_parent');
        window.localStorage.setItem(ADDRESS_KEY_NAME, address);
      }
    }
  }, [modalStep, bank, bankSelected, address, nordigen.link, final, account, error]);

  const renderCountry = (option: { code: string, name: string }) => (
    <Grid className={classes.modalInfoOption}>
      <Grid className={classes.modalFlag}>
        <Flag style={{ width: 28, height: 28, borderRadius: 8 }} countryCode={option.code} svg />
      </Grid>
      <Typography className={classes.modalInfoOptionLabel}>
        {option.name}
      </Typography>
    </Grid>
  );

  const renderBank = (option: Bank) => (
    <Grid className={classes.modalInfoOption}>
      <img className={classes.modalInfoOptionIcon} src={option.logo} alt={option.name} />
      <Typography className={classes.modalInfoOptionLabel}>
        {option.name}
      </Typography>
    </Grid>
  );

  // eslint-disable-next-line no-console
  console.log(bank, bankSelected);
  // console.log(account, 'ACCOUNT');

  return (
    <Component modalStatus={modalStatus} handleModalCloseClick={handleModalCloseClick}>
      <Grid className={classes.modal}>
        {modalType === 'account'
          ? (
            <>
              <Typography className={classes.modalHeadline}>
                Add bank account
              </Typography>
              <Autocomplete
                className={classes.modalInfoBank}
                optionsLoading={nordigen.banksLoading}
                options={nordigenCountries}
                handleChange={handleCountryChange}
                value={nordigenCountries[0]}
                renderOption={renderCountry}
                label="Choose your country"
                getOptionLabel={option => option.name}

              />

              <Autocomplete
                className={classes.modalInfoBank}
                optionsLoading={nordigen.banksLoading}
                options={nordigen.banks || []}
                handleChange={handleBankChange}
                value={bank}
                renderOption={renderBank}
                label="Choose your bank"
                getOptionLabel={option => option.name}
              />
            </>
          )

          : (
            <>
              <Typography className={classes.modalHeadline}>
                Add a liquid address acccount
              </Typography>

              <Grid
                className={classes.formGroup}
                style={{ cursor: 'pointer' }}
              >
                <InputLabel className={classes.commonLabel} htmlFor="label-input">
                  Label
                </InputLabel>
                <Grid className={classes.formGroupRow}>
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
                value={address}
                withExtraProps
                background
                rowsMax={3}
                handleChange={handleAddressChange}
              // handleEnterTextAreaPress={handleEnterTextAreaPress}
              />
            </>
          )}

        <Button
          className={clsx(classes.button, classes.modalFooterButton)}
          // disabled={ !bank || !address }
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleModalSubmit}
        >
          {
            nordigen.loading || (final && !error)
              ? <CircularProgress className={classes.buttonIndicator} color="inherit" size={21} />
              : modalType === 'account' ? 'Add account' : 'Whitelist adress'

          }
        </Button>
      </Grid>

      { /* <ModalNordigenForm
        iban={iban || account?.iban}
        step={modalStep}
        error={final && error}
        loading={nordigen.loading}
        disabled={disabled}
        bankSelected={bankSelected}
        final={final}
        address={address}
        handleSubmit={handleModalSubmit}
        completed={!!account}
      >
        {
          modalStep ? (
            <ModalNordigenInfo
              headline="We use nordigen to validate IBAN"
              message="You will be redirected to the nordigen website"
              error={final && error}
              final={final}
              handleChange={handleBankChange}
              bank={bank}
              options={nordigen.banks || []}
              bankSelected={bankSelected}
              completed={!!account}
              optionsLoading={nordigen.banksLoading}
            />
          ) : (
            <FormInput
              label="Your receiving Liquid address"
              value={address}
              withExtraProps
              background
              rowsMax={3}
              autoFocus={!isMobile}
              handleChange={handleAddressChange}
              handleEnterTextAreaPress={handleEnterTextAreaPress}
            />
          )
        }
      </ModalNordigenForm> */ }
    </Component>
  );
};
