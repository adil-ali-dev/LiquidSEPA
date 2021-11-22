import React, { FC } from 'react';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownContentProps } from './typedef';
import { DotsIcon } from '../../assets/Icons';
import { IbanService } from '../../services';
import { useSessionContext } from '../../contexts/Session';

export const DropdownContent: FC<DropdownContentProps> = ({
  show,
  list,
  listType,
  handleAddPress,
  handleItemPress,
  renderList,
  className
}) => {
  if (!show) return null

  const { status } = useSessionContext();
  const classes = useStyles();

  if (!show) return null;

  const _renderList = () => {
    if (renderList) {
      return renderList()
    } else {
      //@ts-ignore
      return list.map(({ label, xbtAddress }) => {
        const _handleItemPress = () => handleItemPress && handleItemPress(xbtAddress)

        return (
          <Grid key={xbtAddress} className={classes.listItem} onClick={_handleItemPress}>
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
        )
      })
    }
  }

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
    <Grid className={clsx(classes.selectPopup, className)}>
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
      {list.length
        ? _renderList()
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
