import React, { FC, memo } from 'react';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownAlertProps, DropdownContentProps } from './typedef';
import { DotsIcon } from '../../assets/Icons';
import { IbanService } from '../../services';
import { useSessionContext } from '../../contexts/Session';

export const DropdownAlert: FC<DropdownAlertProps> = ({
  text,
  buttonText,
  handleButtonClick,
}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.selectNoItems}>
      <Typography className={classes.selectNoItemsNotice}>
        {text}
      </Typography>
      {buttonText && (
        <Button
          className={classes.addItemButton}
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </Grid>
  )
}
