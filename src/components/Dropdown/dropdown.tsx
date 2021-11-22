import React, { memo, useState } from 'react';
import { Button, ClickAwayListener, FormControl, Grid, InputBase, InputLabel, Menu, MenuItem, Select, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './styles';
import { AccountListItem } from './typedef';
import { DoneIcon, DotsIcon, DropdownArrowIcon } from '../../assets/Icons';
import { DropdownProps } from './typedef';
import { DropdownContent } from './dropdown-content';

export const Dropdown = memo<DropdownProps>(({
  label,
  account,
  selectOpened,
  handleAddPress,
  handleSelectPress,
  handleChooseAccount
}) => {
  const classes = useStyles();

  const _placeholderFnc = () => (
    label.includes('address')
      ? [
        { label: 'Address1', xbtAddress: 'mw5byYhwaNq9c7Nk6CriHviG4KMg7nS4Gwmw5byYhwaNq9c7Nk6CriHviG4KMg7nS4Gw' },
        { label: 'Address2', xbtAddress: 'mqQh6zbbfaRtNh7b5SuCBMMB7tVcGn1AzNmqQh6zbbfaRtNh7b5SuCBMMB7tVcGn1AzN' },
        { label: 'Address3', xbtAddress: 'mr8LPUR8opDfnrgLVTPaQYWguZEV7xnht7mr8LPUR8opDfnrgLVTPaQYWguZEV7xnht7' }
      ]
      : [
        { label: 'Account1', xbtAddress: 'EE581249689829811519' },
        { label: 'Account2', xbtAddress: 'EE911254276187433778' },
        { label: 'Account3', xbtAddress: 'EE561297945933294310' }
      ]
  )
  const accountsList = _placeholderFnc()
  const listType = label.includes('address') ? 'address' : 'account'

  return (
    <ClickAwayListener onClickAway={() => handleSelectPress(false)}>
      <Grid style={{ position: 'relative' }}>
        <Grid
          className={clsx(
            classes.formGroup,
            classes.formGroupSpace,
            classes.pointer,
            classes.select,
            selectOpened && classes.selectActive
          )}
          onClick={() => handleSelectPress(!selectOpened)}
        >
          <InputLabel className={classes.commonLabel}>{label}</InputLabel>
          {account
            ? (
              <Typography className={classes.selectText }>
                {account}
              </Typography>
            )
            : !selectOpened && (
              <Typography className={classes.selectText }>
                Choose {listType}
              </Typography>
            )}

          <Grid className={classes.selectIconWrap}>
            <DropdownArrowIcon className={clsx(classes.selectIcon, selectOpened && classes.selectIconRotated)} />
          </Grid>
        </Grid>
        <DropdownContent
          show={selectOpened}
          list={[]}
          listType={listType}
          handleAddPress={handleAddPress}
          handleItemPress={handleChooseAccount}
        />
      </Grid>
    </ClickAwayListener>
  );
});
