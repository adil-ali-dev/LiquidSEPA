import React, { memo } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';

import { Props } from './typedef';
import { useStyles } from './style';
import { Modal } from '../Modal';
import clsx from 'clsx';
import { Dropdown } from '../Dropdown';
import { Autocomplete } from '../Autocomplete';

export const BankAccountModal = memo<Props>(({
  children,
  country,
  bank,
  loading,
  handleAddressChange,
  handleLabelChange,
  handleSubmit,
  ...modalProps
}) => {
  const classes = useStyles();

  return (
    <Modal { ...modalProps }>
      <form className={ classes.modal } onSubmit={handleSubmit}>
        <Typography className={ classes.modalHeadline }>
          Add an account
        </Typography>

        <Grid className={ classes.modalContent }>
          {/*<Autocomplete handleAddClick={() => {}} emptyText="Countries list is empty" options={[]} label="Country" value="" getOptionLabel={i => i} handleChange={() => {}}/>*/}
          <Dropdown
            label="Country"
            value={country}
            background
            placeholder="Chose country"
            emptyText="Countries list is empty"
            data={[]}
            handleChange={() => {}}
            handleAddClick={() => {}}
            handleSelect={() => {}}
          />

          <Dropdown
            label="Bank"
            value={bank}
            background
            placeholder="Chose bank"
            emptyText="Countries list is empty"
            data={[]}
            handleChange={() => {}}
            handleAddClick={() => {}}
            handleSelect={() => {}}
          />
        </Grid>

        <Button
          className={ clsx(classes.button, classes.modalFooterButton) }
          type="submit"
          variant="contained"
          color="primary"
        >
          {
            loading
              ? <CircularProgress className={ classes.buttonIndicator } color="inherit" size={ 21 }/>
              : 'Create'
          }
        </Button>
      </form>
    </Modal>
  );
});
