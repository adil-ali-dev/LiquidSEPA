import React, { memo } from 'react';
import { Grid } from '@material-ui/core';

import { Currency } from '../../../typedef';
import { PaymentProps } from '../typedef';
import { useStyles } from '../style';
import { Row } from './row';
import { PaymentHeader } from './payment-header';
import { PaymentTxid } from './payment-txid';
import { PaymentDetails } from './payment-details';
import { ConverterService, IbanService } from '../../../services';

export const Payment = memo<PaymentProps>(({
  sellSide,
  confs,
  maxConfs,
  paymentDetails,
  handleTxCopyClick
}) => {
  const classes = useStyles();

  const sellHeader = (
    <>
      <Row label="Txid" spaceLarge>
        <PaymentTxid
          txId={paymentDetails.txId}
          link={paymentDetails.link}
          handleTxCopyClick={handleTxCopyClick}
        />
      </Row>
      <Row
        label="Received"
        value={ConverterService.separate(paymentDetails.received.amount.toFixed(8), ',')}
        product={Currency.EURX}
        spaceMedium
      />
      <Row
        label="Confirmations"
        value={`${ confs }/${maxConfs}`}
        spaceSmall
      />
    </>
  );

  const sellDetails = (
    <PaymentDetails label={ paymentDetails.completed ? 'Payment sent' : 'Payment pending' }>
      <Row
        label="Account name"
        value={paymentDetails.sending.nameOnAccount}
      />
      <Row
        label="IBAN"
        value={IbanService.format(paymentDetails.sending.iban)}
        spaceSmall
      />
      <Row
        label="Sending amount"
        value={ConverterService.separate(paymentDetails.sending.amount.toFixed(2), ',')}
        product={Currency.EUR}
        spaceSmall
      />
    </PaymentDetails>
  );

  const buyHeader = (
    <>
      <Row
        label="Received amount"
        value={ConverterService.separate(paymentDetails.received.amount.toFixed(2), ',')}
        product={Currency.EUR}
        spaceMedium
      />
      <Row
        label="Account Name"
        value={paymentDetails.received.nameOnAccount}
        spaceSmall
      />
      <Row
        label="IBAN"
        value={IbanService.format(paymentDetails.received.iban)}
        spaceSmall
      />
    </>
  );

  const buyDetails = (
    <PaymentDetails label="EURx broadcast">
      <Row label="Txid">
        <PaymentTxid
          txId={paymentDetails.txId}
          link={paymentDetails.link}
          handleTxCopyClick={handleTxCopyClick}
        />
      </Row>
      <Row
        label="Sending amount"
        value={ConverterService.separate(paymentDetails.sending.amount.toFixed(8), ',')}
        product={Currency.EURX}
        spaceLarge
      />
      <Row
        label="Confirmations"
        value={`${ confs }/${maxConfs}`}
        spaceSmall
      />
    </PaymentDetails>
  );

  return (
    <Grid className={classes.payment}>
      <PaymentHeader completed={paymentDetails.completed}>
        {sellSide ? sellHeader : buyHeader}
      </PaymentHeader>
      {sellSide ? sellDetails : buyDetails}
    </Grid>
  );
});
