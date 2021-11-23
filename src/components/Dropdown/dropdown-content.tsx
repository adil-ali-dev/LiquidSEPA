import React, { FC, memo, useCallback, useMemo } from 'react';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import clsx from 'clsx';

import { useStyles } from './styles';
import { AccountListItem, DropdownContentProps } from './typedef';
import { DotsIcon } from '../../assets/Icons';
import { IbanService } from '../../services';
import { useSessionContext } from '../../contexts/Session';
import { DropdownAlert } from './dropdown-alert';
import { DropdownHeader } from './dropdown-header';

export const DropdownContent = <T extends AccountListItem>({
  open,
  className,
  renderHeader,
  data,
  renderItem,
  loginRequired,
  handleButtonClick,
  headerText,
  emptyText,
  handleAddClick,
  handleItemClick,
}: DropdownContentProps<T>) => {
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

    handleButtonClick?.();
  }, [status, handleAddClick]);

  const _renderList = () => {
    return data.map(item => {
      return (
        <Grid key={item.value} className={classes.listItem} onClick={() => handleItemClick?.(item)}>
          <Grid className={classes.listItemTextWrap}>
            <Typography className={classes.listItemHeading}>
              {item.label}
            </Typography>
            <Typography className={classes.listItemText}>
              {item.value}
            </Typography>
          </Grid>
          <Button className={classes.listItemMoreButton}>
            <DotsIcon />
          </Button>
        </Grid>
      )
    });
  }

  return open ? (
    <Grid className={clsx(classes.selectPopup, className)}>
      {headerText && (
        <DropdownHeader
          text={headerText}
          buttonText={ (status && !!data.length) ? '+ ADD' : null }
          handleButtonClick={handleAddClick}
        />
      )}
      {data.length
        ? _renderList()
        : (
          <DropdownAlert
            text={alertText}
            buttonText={alertButtonText}
            handleButtonClick={handleAlertButtonClick}
          />
        )
      }
    </Grid>
  ) : null;
}
