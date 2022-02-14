import React, { FC, useCallback, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
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
  handleExited,
  ...dropdownContentProps
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(autoFocus ?? false);

  const handleContainerClick = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    handleExited?.();
  }, []);

  return (
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
        <Typography className={ classes.label }>
          { label }
        </Typography>
        <Grid className={ classes.selectedContainer }>
          {
            !value ? (
              <Typography className={ classes.formGroupPlaceholder }>
                { placeholder }
                </Typography>
            ) : dropdownContentProps.renderItem(value, dropdownContentProps.data.indexOf(value), true)
          }
        </Grid>
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
  );
};
