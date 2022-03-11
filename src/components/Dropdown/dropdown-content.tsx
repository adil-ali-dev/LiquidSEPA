import React, { FC, useCallback, useMemo } from 'react';
import { ClickAwayListener, ButtonBase, Grid } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownContentProps } from './typedef';
import { useSessionContext } from '../../contexts/Session';
import { DropdownAlert } from './dropdown-alert';
import { DropdownHeader } from './dropdown-header';

export const DropdownContent: FC<DropdownContentProps> = ({
  open,
  className,
  renderHeader,
  data,
  renderItem,
  loginRequired,
  close,
  headerText,
  emptyText,
  disabled,
  handleAddClick,
  keyExtractor,
  checkSelected,
  handleItemSelect
}) => {
  const classes = useStyles();
  const { statusForUI } = useSessionContext();

  const alertText = useMemo(() => {
    return (loginRequired && !statusForUI) ? 'You need to be logged in' : emptyText;
  }, [statusForUI, emptyText]);

  const alertButtonText = useMemo(() => {
    return (loginRequired && !statusForUI) ? 'Login' : '+ ADD';
  }, [statusForUI, loginRequired]);

  const handleAlertButtonClick = useCallback(() => {
    if (disabled) return;

    handleAddClick?.();
    close();
  }, [handleAddClick, disabled]);

  const renderDropdownItem = useCallback((item: any, idx: number) => {
    const handleDropdownItemClick = () => {
      handleItemSelect(item);
      close();
    };

    const isSelected = checkSelected?.(item);

    return (
      <ButtonBase
        className={ clsx(classes.listItem, isSelected && classes.listItemActive) }
        key={ keyExtractor(item) }
        disableRipple
        disableTouchRipple
        onClick={ handleDropdownItemClick }
      >
        { renderItem(item, idx) }
      </ButtonBase>
    )
  }, [handleItemSelect]);

  return open ? (
    <ClickAwayListener onClickAway={ close }>
      <Grid
        className={ clsx(classes.selectPopup, !data.length && classes.selectPopupPointer, className) }
        onClick={ !data.length ? handleAlertButtonClick : undefined }
      >
        {headerText && (
          <DropdownHeader
            text={ headerText }
            close={ close }
            buttonText={ (statusForUI && !!data.length) ? '+ ADD' : null }
            handleButtonClick={ handleAddClick }
          />
        )}
        {(!data.length || !statusForUI) ? (
          <DropdownAlert
            text={ alertText }
            disabled
            buttonText={ alertButtonText }
            handleButtonClick={ handleAlertButtonClick }
          />
        ) : (
          <Grid className={ classes.selectList }>
            { data.map(renderDropdownItem) }
          </Grid>
        )}
      </Grid>
    </ClickAwayListener>
  ) : null;
}
