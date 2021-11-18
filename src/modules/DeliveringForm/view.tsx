import React from 'react';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';

import { withDeliveringFormDomain } from './domain';
import { useStyles } from './style';

export const DeliveringFormModule = withDeliveringFormDomain(({ next, widgetRef, children }) => {
  const classes = useStyles();

  return (
    <Paper className={ clsx(classes.container, next && classes.containerNext) } elevation={ 0 } innerRef={ widgetRef }>
      { children }
    </Paper>
  );
});
