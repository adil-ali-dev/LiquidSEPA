import React from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { withWhitelistAddressDomain } from './domain';
import { Modal } from '../../components/Modal';
import { FormInput } from '../DeliveringForm/components/form-input';
import { useStyles } from './style';


export const WhitelistAddressModule = withWhitelistAddressDomain(({
  children,
  label,
  address,
  addressValid,
  loading,
  handleLabelChange,
  handleAddressChange,
  handleAddressKeyDown,
  disabled,
  handleSubmit,
  ...modalProps
}) => {
  const classes = useStyles();

  return (
    <Modal { ...modalProps }>
      <Grid className={ classes.modal }>
        <form onSubmit={ handleSubmit }>
          <Typography className={ classes.modalHeadline }>
            Whitelist Address
          </Typography>

          <Grid className={ classes.modalContent }>
            <FormInput
              label="Label"
              value={ label }
              placeholder="Address Label"
              background
              autoFocus
              handleChange={ handleLabelChange }
            />

            <FormInput
              label="Address"
              placeholder="Address"
              value={ address }
              background
              error={ !!address.length && !addressValid }
              withExtraProps
              handleChange={ handleAddressChange }
              handleKeyDown={ handleAddressKeyDown }
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
                : 'Whitelist Address'
            }
          </Button>
        </form>
      </Grid>
    </Modal>
  );
});
