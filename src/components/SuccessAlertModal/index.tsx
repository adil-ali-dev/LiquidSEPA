import React, { memo } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { Props } from './typedef';
import { useStyles } from './style';
import { CheckLarge } from '../../assets/Icons';

export const SuccessAlertModal = memo<Props>(({
  text,
  handleButtonClick
}) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.container }>
      <CheckLarge className={ classes.icon } />

      <Typography className={ classes.modalHeadline }>
        { text }
      </Typography>

      <Button
        className={ clsx(classes.button, classes.modalFooterButton) }
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        OK
      </Button>
    </Grid>
  );
});
