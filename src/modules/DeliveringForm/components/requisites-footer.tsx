import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { BitcoinAddressService } from '../../../services';
import { RequisitesFooterProps } from '../typedef';
import { CheckIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

export const RequisitesFooter = memo<RequisitesFooterProps>(({ sellSide, value }) => {
  const classes = useStyles();

  return sellSide ? (
    <Grid className={ classes.footer }>
      <Typography className={ classes.footerText }>
        If your bank supports SEPA Instant Credit, the EURx will be with you in approximately a minute. Should
        your payment be done as a regular SEPA payment, we should receive the funds within the next clearing
        cycle.
      </Typography>
      <Grid className={ clsx(classes.formGroup, classes.formGroupSpace) }>
        <Typography className={ classes.commonLabel }>Your receiving IBAN account</Typography>
        <Typography className={ classes.formGroupTextValue }>{ value }</Typography>
        <Grid className={ classes.formGroupSuccessMessage }>
          <CheckIcon className={ classes.formGroupSuccessMessageIcon }/>
          <Typography className={ classes.formGroupSuccessMessageText }>
            SEPA Instant Credit.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid className={ clsx(classes.footer, classes.footerAddress) }>
      <Grid className={ clsx(classes.formGroup) }>
        <Typography className={ clsx(classes.commonLabel, classes.commonLabelHeight) }>
          Once the EUR payment is detected, the EURx will immediately be sent to your Liquid address:
        </Typography>
        <Typography className={ classes.formGroupTextValue }>
          { BitcoinAddressService.crop(value, 170) }
        </Typography>
      </Grid>
    </Grid>
  );
});
