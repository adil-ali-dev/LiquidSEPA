import React, { FC, memo, useCallback, useMemo } from 'react';
import { Button, ButtonBase, Grid, Link, Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import clsx from 'clsx';

import { useStyles } from './styles';
import { AccountListItem, DropdownContentProps } from './typedef';
import { DotsIcon } from '../../assets/Icons';
import { IbanService } from '../../services';
import { useSessionContext } from '../../contexts/Session';
import { DropdownAlert } from './dropdown-alert';
import { DropdownHeader } from './dropdown-header';
import { WhitelistedAddress } from '../../graphql/WhitelistAddress/typedef';
import { BankAccount } from '../../graphql/BankAccount/typedef';

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
  handleAddClick,
  keyExtractor,
  checkSelected,
  handleItemSelect
}) => {
  const classes = useStyles();
  const { status, controls } = useSessionContext();

  const alertText = useMemo(() => {
    return (loginRequired && !status) ? 'You need to be logged in' : emptyText;
  }, [status, emptyText]);

  const alertButtonText = useMemo(() => {
    return (loginRequired && !status) ? 'Login' : '+ ADD';
  }, [status]);

  const handleAlertButtonClick = useCallback(() => {
    if (loginRequired && !status) {
      controls.openLogin()
    } else {
      handleAddClick?.();
    }

    close();
  }, [status, handleAddClick]);

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
        { renderItem(item,idx) }
      </ButtonBase>
    )
  }, [handleItemSelect]);

  return open ? (
    <Grid className={ clsx(classes.selectPopup, className) }>
      {headerText && (
        <DropdownHeader
          text={ headerText }
          close={ close }
          buttonText={ (status && !!data.length) ? '+ ADD' : null }
          handleButtonClick={ handleAddClick }
        />
      )}
      {data.length
        ? (
          <Grid className={ classes.selectList }>
            { data.map(renderDropdownItem) }
          </Grid>
        )
        : (
          <DropdownAlert
            text={ alertText }
            buttonText={ alertButtonText }
            handleButtonClick={ handleAlertButtonClick }
          />
        )
      }
    </Grid>
  ) : null;
}
