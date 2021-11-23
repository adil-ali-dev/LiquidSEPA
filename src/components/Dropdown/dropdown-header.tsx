import React, { FC, memo } from 'react';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import clsx from 'clsx';

import { useStyles } from './styles';
import { DropdownAlertProps, DropdownContentProps, DropdownHeaderProps } from './typedef';
import { DotsIcon } from '../../assets/Icons';
import { IbanService } from '../../services';
import { useSessionContext } from '../../contexts/Session';

export const DropdownHeader: FC<DropdownHeaderProps> = ({
  text,
  buttonText,
  handleButtonClick,
}) => {
  const classes = useStyles();

  return (
    <Grid className={classes.listHeading}>
      <Typography
        className={clsx(classes.selectText, classes.selectChoseLabelText)}
      >
        {text}
      </Typography>
      {buttonText && (
        <Button
          className={clsx(classes.addItemButton, classes.addItemHeaderButton)}
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
