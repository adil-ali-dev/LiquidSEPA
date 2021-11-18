import React, { memo } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import { PaymentTxIdProps } from '../typedef';
import { CopyIcon, LinkIcon } from '../../../assets/Icons';
import { useStyles } from '../style';

export const PaymentTxid = memo<PaymentTxIdProps>(({
  txId,
  link,
  handleTxCopyClick
}) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.paymentDetailsTxid }>
      <Typography className={ classes.paymentDetailsItemText }>
        { txId }
      </Typography>
      <Grid className={ classes.paymentDetailsItemButtons }>
        <Button className={ classes.paymentDetailsItemButton } onClick={ handleTxCopyClick }>
          <Grid className={ classes.detailsAddressCopyIconContainer }>
            <CopyIcon className={ classes.detailsAddressCopyIcon }/>
          </Grid>
          Copy Txid
        </Button>
        <Button className={ classes.paymentDetailsItemButton } href={ link } target="_blank">
          <Grid className={ classes.detailsAddressExploreIconContainer }>
            <LinkIcon className={ classes.detailsAddressCopyIcon }/>
          </Grid>
          Explore Txid
        </Button>
      </Grid>
    </Grid>
  );
});
