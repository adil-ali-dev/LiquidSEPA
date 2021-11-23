import React, { useCallback, useMemo, useState } from 'react';
import { ClickAwayListener, Grid, InputBase, InputLabel } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './styles';
import { AccountListItem } from './typedef';
import { DropdownArrowIcon } from '../../assets/Icons';
import { DropdownProps } from './typedef';
import { DropdownContent } from './dropdown-content';

export const Dropdown = <T extends AccountListItem>({
  label,
  handleChange,
  handleSelect,
  error,
  headerText,
  autoFocus,
  withExtraProps,
  placeholder,
  background,
  rowsMax,
  value,
  ...dropdownContentProps
}: DropdownProps<T>) => {
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
      <Grid style={{ position: 'relative' }}>
        <Grid
          className={clsx(
            classes.formGroup,
            classes.formGroupSpace,
            background && classes.formGroupBackground,
            rowsMax && classes.formGroupFixedHeight,
            rowsMax && classes.formGroupInputMedium,
            focused && classes.selectActive
          )}
        >
          <InputLabel className={classes.commonLabel} htmlFor={ `text-area-input-${label}` }>{label}</InputLabel>
          <InputBase
            className={clsx(classes.formGroupInput, classes.selectText)}
            id={ `text-area-input-${label}` }
            multiline
            onFocus={handleFocus}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            {...(withExtraProps && { rowsMax })}
          />
          <Grid className={classes.selectIconWrap}>
            <DropdownArrowIcon className={clsx(classes.selectIcon, focused && classes.selectIconRotated)} />
          </Grid>
        </Grid>
        <DropdownContent
          headerText={placeholder}
          handleButtonClick={handleBlur}
          open={focused}
          {...dropdownContentProps}
        />
      </Grid>
    </ClickAwayListener>
  );
};
