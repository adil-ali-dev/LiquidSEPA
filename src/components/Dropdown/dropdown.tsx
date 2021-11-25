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

  const [focused, setFocused] = useState(autoFocus ?? false);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleBlur}>
      <Grid className={ classes.container } >
        <Grid
          className={
            clsx(
              classes.formGroup,
              classes.formGroupSpace,
              background && classes.formGroupBackground,
              withExtraProps && classes.formGroupFixedHeight,
              rowsMax && classes.formGroupLong,
              focused && classes.selectActive
            )
          }
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
            onFocus={ handleFocus }
            placeholder={ placeholder }
            value={ value }
            onChange={ handleChange }
            { ...(withExtraProps && { rowsMax }) }
          />
          <Grid className={ classes.selectIconWrap }>
            <DropdownArrowIcon className={ clsx(classes.selectIcon, focused && classes.selectIconRotated) } />
          </Grid>
        </Grid>
        <DropdownContent
          headerText={ placeholder }
          close={ handleBlur }
          open={ focused }
          { ...dropdownContentProps }
        />
      </Grid>
    </ClickAwayListener>
  );
};
