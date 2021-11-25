import React, { memo } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { default as QRCodeComponent } from 'react-qr-code';

import { Props } from './typedef';
import { useStyles } from './style';
import clsx from 'clsx';


export const QRCode = memo<Props>(({ loading, value }) => {
  const classes = useStyles();

  const progress = loading || !value;

  return (
    <Grid className={ clsx(classes.container, !progress && classes.containerBackground) }>
      {
        progress ? (
          <CircularProgress/>
        ) : (
          <QRCodeComponent value={ value! } size={ 180 }/>
        )
      }
    </Grid>
  );
});
