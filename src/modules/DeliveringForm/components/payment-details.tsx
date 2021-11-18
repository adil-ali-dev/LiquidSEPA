import React, { memo } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';

import { PaymentDetailsProps } from '../typedef';
import { useStyles } from '../style';

export const PaymentDetails = memo<PaymentDetailsProps>(({ label, children }) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.paymentDetails }>
      <Typography className={ classes.paymentDetailsHeadline }>
        { label }
      </Typography>
      <Divider className={ classes.paymentDetailsDivider }/>
      <Grid className={ classes.paymentDetailsContent }>
        { children }
      </Grid>
    </Grid>
  );
});
