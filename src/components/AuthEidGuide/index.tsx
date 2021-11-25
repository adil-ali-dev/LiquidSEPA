import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { AuthEidLogoIcon } from '../../assets/Icons';
import { Props } from './typedef';


export const AuthEidGuide = memo<Props>(({ className }) => {
  const classes = useStyles();

  return (
    <Grid className={ clsx(classes.container, className) }>
      <Grid className={ classes.logoContainer }>
        <AuthEidLogoIcon/>
      </Grid>
      <Grid>
        <Typography className={ classes.text }>
          1. Open the Auth eID App on your mobile phone.
        </Typography>
        <Typography className={ classes.text }>
          2. Tap the QR symbol on the Auth eID App.
        </Typography>
        <Typography className={ classes.text }>
          3. Point the camera at the QR code in this field.
        </Typography>
      </Grid>
    </Grid>
  );
});
