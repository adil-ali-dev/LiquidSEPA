import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownContentProps } from './typedef';
import { DotsIcon } from '../../assets/Icons';
import { IbanService } from '../../services';
import { useSessionContext } from '../../contexts/Session';

export const DropdownContent: FC<DropdownContentProps> = ({ show, list, listType, handleAddPress, handleItemPress }) => {
  const classes = useStyles();
  const { status } = useSessionContext();

  if (!show) return null;

  const renderList = (list: any[]) => (
    list.map(({ label, xbtAddress }) => (
      <Grid key={xbtAddress} className={classes.listItem} onClick={() => handleItemPress(xbtAddress)}>
        <Grid className={classes.listItemTextWrap}>
          <Typography className={classes.listItemHeading}>{label}</Typography>
          <Typography className={classes.listItemText}>
            {listType === 'account' ? IbanService.format(xbtAddress) : xbtAddress}
          </Typography>
        </Grid>
        <Button className={classes.listItemMoreButton}>
          <DotsIcon />
        </Button>
      </Grid>
    ))
  )

  const _handleAddPress = () => {
    handleAddPress && handleAddPress(listType)
  }

  const renderAlert = () => (
    <Grid className={classes.selectNoItems}>
      <Typography className={classes.selectNoItemsNotice}>
        {status ? `You do not have any ${pluralize(listType)}` : 'You need to be logged in'}
      </Typography>
      <Button
        className={classes.addItemButton}
        variant="contained"
        color="primary"
        onClick={_handleAddPress}
      >
        {status ? '+ ADD' : 'Login'}
      </Button>
    </Grid>
  );

  return (
    <Grid className={classes.selectPopup}>
      <Grid className={classes.listHeading}>
        <Typography
          className={clsx(classes.selectText, classes.selectChoseLabelText)}
        >
          Choose {listType}
        </Typography>
        {handleAddPress && !!list.length && (
          <Button
            className={classes.addItemButton}
            variant="contained"
            color="primary"
            onClick={_handleAddPress}
          >
            + ADD
          </Button>
        )}
      </Grid>
      { (!list.length || !status) ? renderAlert() : renderList(list) }
    </Grid>
  )
}
