import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { AccountType } from '../../typedef';
import { Props } from './typedef';
import { BitcoinAddressService, IbanService } from '../../services';
import { useStyles } from './style';


export const Account = memo<Props>(({ value, active, idx, cropAddress }) => {
  const classes = useStyles();

  if (!value) return null;

  const isBank = value?.type === AccountType.BANK;

  return isBank ? (
      <Grid className={ classes.container }>
      {
        // @ts-ignore
        value.account_details?.bank_id && (
          // @ts-ignore
          <img className={ classes.logo } src={ value.logo } alt={ value.account_details?.bankName } />
        )
      }
      <Grid className={ classes.textContainer }>
        <Typography className={ clsx(classes.headline, active && classes.headlineActive) }>
          {/* @ts-ignore */}
          { value.account_details?.bankName || `Account ${ (idx || 0) + 1 }` }
        </Typography>
        <Typography className={ classes.subHeadline }>
          { IbanService.format(value.name) }
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Grid className={ classes.textContainer }>
      <Typography className={ clsx(classes.headline, active && classes.headlineActive) }>
        { value.name }
      </Typography>
      <Typography className={ clsx(classes.subHeadline, active && classes.subHeadlineActive) }>
        { cropAddress ? BitcoinAddressService.crop(value.acctNum, 135) : value.acctNum }
      </Typography>
    </Grid>   
    );
});
