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
  if (!show) return null

  const { status } = useSessionContext();
  const classes = useStyles();

  if (!status) return (
    <Grid className={classes.selectPopup}>
      <Grid className={classes.selectNoItems}>
        <Typography className={clsx(classes.selectNoItemsNotice, classes.unauthNotice)}>
          Please Log in or Register first
        </Typography>
      </Grid>
    </Grid>
  )

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

  return (
    <Grid className={classes.selectPopup}>
      <Grid className={classes.listHeading}>
        <Typography
          className={classes.selectText}
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
      {list.length
        ? renderList(list)
        : (
          <Grid className={classes.selectNoItems}>
            <Typography className={classes.selectNoItemsNotice}>
              You do not have any {pluralize(listType)}
            </Typography>
            <Button
              className={classes.addItemButton}
              variant="contained"
              color="primary"
              onClick={_handleAddPress}
            >
              + ADD
            </Button>
          </Grid>
        )
      }
    </Grid>
  )
}
