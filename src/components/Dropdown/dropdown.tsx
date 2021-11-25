import React, { FC, useCallback, useState } from 'react';
import { ClickAwayListener, Grid, InputBase, InputLabel } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownArrowIcon } from '../../assets/Icons';
import { DropdownProps } from './typedef';
import { DropdownContent } from './dropdown-content';

export const Dropdown: FC<DropdownProps> = ({
  label,
  handleChange,
  error,
  headerText,
  autoFocus,
  withExtraProps,
  notEditable,
  placeholder,
  background,
  rowsMax,
  value,
  ...dropdownContentProps
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(autoFocus ?? false);

  const handleContainerClick = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ClickAwayListener onClickAway={ handleClose }>
      <Grid className={ classes.container }>
        <Grid
          className={
            clsx(
              classes.formGroup,
              classes.formGroupSpace,
              background && classes.formGroupBackground,
              withExtraProps && classes.formGroupFixedHeight,
              rowsMax && classes.formGroupLong,
              open && classes.selectActive,
              open && classes.formGroupFocused
            )
          }
          onClick={ handleContainerClick }
        >
          <InputLabel className={ classes.label } htmlFor={ `text-area-input-${label}` }>
            { label }
          </InputLabel>
          <InputBase
            className={
              clsx(
                classes.formGroupInput,
                classes.selectText,
                notEditable && classes.formGroupInputNotEditable,
                rowsMax && classes.formGroupInputLong
              )
            }
            id={ `text-area-input-${label}` }
            multiline
            placeholder={ placeholder }
            value={ value }
            onChange={ handleChange }
            { ...(withExtraProps && { rowsMax }) }
          />
          <Grid className={ classes.selectIconWrap }>
            <DropdownArrowIcon className={ clsx(classes.selectIcon, open && classes.selectIconRotated) } />
          </Grid>
        </Grid>
        <DropdownContent
          headerText={ placeholder }
          close={ handleClose }
          open={ open }
          { ...dropdownContentProps }
        />
      </Grid>
    </ClickAwayListener>
  );
};
