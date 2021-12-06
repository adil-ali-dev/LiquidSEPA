import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { PaymentHeaderProps } from '../typedef';
import { CheckIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

export const PaymentHeader = memo<PaymentHeaderProps>(({ confirmed, children }) => {
  const classes = useStyles();

  const className = confirmed ? classes.paymentHeaderIconContainerBackground : classes.paymentHeaderIconContainerBorder;

  return (
    <Grid className={ classes.paymentHeader }>
      <Grid className={ classes.paymentHeaderRow }>
        <Grid className={ clsx(classes.paymentHeaderIconContainer, className) }>
          <CheckIcon className={ clsx(classes.paymentHeaderIcon, !confirmed && classes.paymentHeaderIconBlue) }/>
        </Grid>
        <Typography className={ classes.headerText } variant="h6">
          Payment { confirmed ? 'sent' : 'received' }
        </Typography>
      </Grid>
      { children }
    </Grid>
  );
});
