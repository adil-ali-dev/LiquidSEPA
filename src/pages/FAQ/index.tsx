import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export const FAQPage: FC = () => {
  const classes = useStyles();

  return (
    <Grid className={ classes.page }>
      <Header/>
      <Grid className={ classes.introSection }>
        <Grid className={ clsx(classes.wrapper, classes.introWrapper) }>
          <Typography className={ classes.introHeadline } component="h2">
            FAQ
          </Typography>
        </Grid>
      </Grid>
      <Grid className={ classes.main }>
        <Grid className={ classes.wrapper }>
          <Grid>
            <Typography className={ classes.sectionHeadline } component="h3">How do I buy EURx?</Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Generate an address in your Liquid wallet.
              </li>
              <li className={ classes.sectionText }>
                Paste the newly generated address into
                the <strong>&quot;Your receiving Liquid address&quot;</strong> field and
                press <strong>&quot;Continue&quot;</strong>.
              </li>
              <li className={ classes.sectionText }>
                Copy the IBAN and reference number.
              </li>
              <li className={ classes.sectionText }>
                Go to your banking portal and pay exactly EUR 1,000 to our account. Do not forget to include the
                reference number.
              </li>
              <li className={ classes.sectionText }>
                Once we receive the payment, we will immediately deliver the EURx to your Liquid address.
              </li>
            </ol>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">How do I sell EURx?</Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Make sure you have your IBAN at hand.
              </li>
              <li className={ classes.sectionText }>
                Generate an address in your Liquid wallet.
              </li>
              <li className={ classes.sectionText }>
                Paste your IBAN into the <strong>&quot;Your receiving IBAN account&quot;</strong> field and
                press <strong>&quot;Continue&quot;</strong>.
              </li>
              <li className={ classes.sectionText }>
                Copy the Liquid address, or scan the QR from your mobile wallet.
              </li>
              <li className={ classes.sectionText }>
                Pay exactly EURx 1,000 to our Liquid address.
              </li>
              <li className={ classes.sectionText }>
                Once we receive EURx delivery, we will immediately make our SEPA payment.
              </li>
            </ol>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Transaction limits</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Users may make one purchase and one sell per rolling 30 day period for exactly EUR 1,000.
            </Typography>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Customer due diligence</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Measures to attain customer due diligence shall proceed on the basis of our general risk assessment in
              combination with an assessment of the risk presented by the individual customer.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Without sufficient knowledge about the customer, we may not establish or maintain a business relationship,
              or carry out occasional transactions.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Neither may we establish a business relationship if it is suspected that our products might be used for
              money laundering or terrorist financing. Similarly, we may not carry out a transaction if, on reasonable
              grounds, it could suspect money laundering or terrorist financing.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Customer due diligence shall also be performed for such transactions as referred to in Article 3(9) of
              Regulation 2015/847 if the amount exceeds EUR 1,000 on a 30 day basis.
            </Typography>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Wrong reference number</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              If you forgot to include the reference number when making your payment, or entered the wrong reference
              number, there is no way for us to map your payment to a Liquid address. To resolve the situation, please
              email us an account print-out of your transaction and the Liquid address to which you would like to
              receive EURx delivery.
            </Typography>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">I sent the wrong amount</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Please contact us via email so we can work together to resolve the situation.
            </Typography>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Fees</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              We charge a fixed fee of EUR 25 fee per transaction. Each transaction must be for the exact amount of
              EUR 1,000.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
};
