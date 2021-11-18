import React, { memo, useState } from 'react';
import { Button, ClickAwayListener, FormControl, Grid, InputBase, InputLabel, Menu, MenuItem, Select, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from '../style';
import { FormInputProps } from '../typedef';
import { DoneIcon } from '../../../assets/Icons';

export const FormInput = memo<FormInputProps>(({
  label,
  value,
  error,
  autoFocus,
  reference,
  withExtraProps,
  rowsMax,
  background,
  verified,
  account,
  selectOpened,
  handleChange,
  handleAddPress,
  handleSelectPress
}) => {
  const classes = useStyles();

  return (
    <ClickAwayListener onClickAway={ () => handleSelectPress(false) }>
      <Grid style={{ position: 'relative' }}>
        <Grid
          className={ clsx(
            classes.formGroup,
            classes.formGroupSpace,
            classes.pointer,
            classes.select,
            selectOpened && classes.selectActive
          ) }
          onClick={ () => handleSelectPress(!selectOpened) }
        >
          <InputLabel className={ classes.commonLabel }>{ label }</InputLabel>
          { !selectOpened && (
            <Typography className={ classes.selectPlaceholder }>
              Choose { label.includes('address') ? 'address' : 'account' }
            </Typography>
          ) }

          <Grid className={ classes.selectIconWrap }>
            <svg
              className={ clsx(classes.selectIcon, selectOpened && classes.selectIconRotated) }
              focusable="false"
              height="24"
              width="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </Grid>
        </Grid>

        { selectOpened && (
          <Grid
            className={ classes.selectPopup }
          >
            <Typography
              className={ classes.selectPlaceholder }
            >
              Choose { label.includes('address') ? 'address' : 'account' }
            </Typography>
            <Grid className={ classes.selectNoItems }>
              <Typography className={ classes.selectNoItemsNotice }>
                You do not have any { label.includes('address') ? 'addresses' : 'accounts' }
              </Typography>
              <Button
                className={ classes.selectNoItemsButton }
                variant="contained"
                color="primary"
                onClick={ () => handleAddPress(label.includes('address') ? 'address' : 'account') }
              >
                + ADD
              </Button>
            </Grid>
          </Grid>
        ) }
      </Grid>
    </ClickAwayListener>
  );
});
