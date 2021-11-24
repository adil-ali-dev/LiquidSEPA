import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import { useStyles } from './styles';
import { DropdownAlertProps } from './typedef';

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
