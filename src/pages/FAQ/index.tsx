import React, { FC } from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const FAQPage: FC = () => {
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
            <Typography className={ classes.sectionHeadline } component="h3">How do I register?</Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Download the Auth eID app to your mobile device.
              </li>
              <li className={ classes.sectionText }>
                Go through the full onboarding and wait for them to confirm your identity.
              </li>
              <li className={ classes.sectionText }>
                Press the registration button and scan the QR code with your Auth eID application.
              </li>
              <li className={ classes.sectionText }>
                Sign the KYC request.
              </li>
            </ol>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">How do I login?</Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Press the login button and scan the QR code with your Auth eID application.
              </li>
              <li className={ classes.sectionText }>
                Sign the authentication request.
              </li>
            </ol>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography
              className={ classes.sectionHeadline }
              component="h3"
            >
              How do I whitelist a Liquid address?
            </Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                When you’re selling EUR and receiving EURx stablecoin, we need to deliver the EURx balance to an
                address you control.
              </li>
              <li className={ classes.sectionText }>
                You may white-list one, or more, addresses with our service by pressing “Add address” button
              </li>
              <li className={ classes.sectionText }>
                Generate an address in your Liquid wallet and paste it into the address entry field.
              </li>
              <li className={ classes.sectionText }>
                Press the “Whitelist” button and sign the request in your Auth eID application.
              </li>
              <li className={ classes.sectionText }>
                Rinse, repeat to add further addresses.
              </li>
            </ol>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              How do I whitelist a EUR account?
            </Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                When you’re selling EURx and receiving a EUR bank transfer, we need to deliver the EUR balance to an
                account you control.
              </li>
              <li className={ classes.sectionText }>
                You may white-list one, or more, bank accounts by pressing the “Add account” button.
              </li>
              <li className={ classes.sectionText }>
                Select the country in which your bank account exists.
              </li>
              <li className={ classes.sectionText }>
                Select the bank.
              </li>
              <li className={ classes.sectionText }>
                Validate your bank account through your banks own Open Banking validation API.
              </li>
              <li className={ classes.sectionText }>
                Rinse, repeat to add further accounts.
              </li>
            </ol>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">How do I buy EURx?</Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Enter the amount of EUR you wish to sell.
              </li>
              <li className={ classes.sectionText }>
                Select the address to which you wish to receive your EURx balance.
              </li>
              <li className={ classes.sectionText }>
                Press “Continue”.
              </li>
              <li className={ classes.sectionText }>
                Copy the the account name, IBAN and reference number.
              </li>
              <li className={ classes.sectionText }>
                Go to your banking portal and transfer the requested amount to our account. Do not forget to include
                the reference number!
              </li>
              <li className={ classes.sectionText }>
                Once we receive the payment, we will immediately deliver EURx to your whitelisted Liquid address.
              </li>
            </ol>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">How do I sell EURx?</Typography>
            <ol className={ classes.sectionList }>
              <li className={ classes.sectionText }>
                Enter the amount of EURx you wish to sell.
              </li>
              <li className={ classes.sectionText }>
                Select the account to which you wish to receive your EUR balance.
              </li>
              <li className={ classes.sectionText }>
                Press “Continue”.
              </li>
              <li className={ classes.sectionText }>
                Copy the Liquid address, or scan the QR from your mobile wallet.
              </li>
              <li className={ classes.sectionText }>
                Transfer the requested amount to the generated Liquid address.
              </li>
              <li className={ classes.sectionText }>
                Once we receive EURx delivery, we will immediately make our SEPA payment.
              </li>
            </ol>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">
              What Liquid network wallet do you recommend?
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              The easiest way for most users to get started with sending and receiving Liquid assets is&nbsp;
              <Link href="https://blockstream.com/green/">Blockstream Green</Link> available for all major operating
              systems across mobile and desktop.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Transaction limits</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Users may make as many purchases or sales as they wish without limits. If your transaction volumes
              trigger our AML controls, you may be asked to provide further information regarding the nature and
              purpose of your transactions.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Customer due diligence</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              Measures to attain customer due diligence shall proceed on the basis of our general risk assessment in
              combination with an assessment of the risk presented by the individual customer.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Without sufficient knowledge about the customer, we may not establish or maintain a business
              relationship, or carry out occasional transactions.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Neither may we establish a business relationship if it is suspected that our products might be used for
              money laundering or terrorist financing. Similarly, we may not carry out a transaction if, on
              reasonable grounds, it could suspect money laundering or terrorist financing.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Customer due diligence shall also be performed for all users regardless of their transaction volumes.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Wrong reference number</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              If you forgot to include the reference number when making your payment, or entered the wrong reference
              number, we may be able to map your payment to the originating account if you have a whitelisted bank
              account and the transfer indeed originates from this account.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              To resolve the situation, please email us an account print-out of your transaction and the Liquid address
              to which you would like to receive EURx delivery.
            </Typography>
          </Grid>

          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">I sent the wrong amount</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              We will automatically recalculate the payout amount based on the amount we receive.
            </Typography>
          </Grid>
          <Grid className={ classes.sectionSpace }>
            <Typography className={ classes.sectionHeadline } component="h3">Fees</Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMain) }>
              We charge a fixed fee of EUR 5 fee per transaction, and a variable fee of 1% on the total amount.
              A sale of EUR 1’000 will result in a receipt of EURx 985.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
};

export default FAQPage;
