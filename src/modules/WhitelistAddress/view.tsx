import React, { memo } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';

import { useStyles } from './style';
import { Modal } from '../../components/Modal';
import clsx from 'clsx';
import { Dropdown } from '../../components/Dropdown';
import { withWhitelistAddressDomain } from './domain';
import { Autocomplete } from '../../components/Autocomplete';
import { Bank, Country } from '../../graphql/Nordigen/typedef';
import { FormInput } from '../DeliveringForm/components/form-input';
import { SuccessAlertModal } from '../../components/SuccessAlertModal';

function Flag(props: { style: { borderRadius: number; width: number; height: number }, svg: boolean, countryCode: string }) {
  return null;
}

export const WhitelistAddressModule = withWhitelistAddressDomain(({
  children,
  label,
  address,
  loading,
  handleLabelChange,
  handleAddressChange,
  disabled,
  success,
  handleSubmit,
  ...modalProps
}) => {
  const classes = useStyles();

  return (
    <Modal { ...modalProps }>
      <Grid className={ classes.modal }>
        {
          success ? (
            <SuccessAlertModal
              text="Address successfully whitelisted"
              handleButtonClick={ modalProps.handleClose }
            />
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography className={ classes.modalHeadline }>
                Whitelist Address
              </Typography>

              <Grid className={ classes.modalContent }>
                <FormInput
                  label="Label"
                  value={label}
                  placeholder="Address Label"
                  background
                  handleChange={handleLabelChange}
                />

                <FormInput
                  label="Address"
                  placeholder="Address"
                  value={address}
                  background
                  withExtraProps
                  handleChange={handleAddressChange}
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
          )
        }
      </Grid>
    </Modal>
  );
});
