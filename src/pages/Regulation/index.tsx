import React, { FC } from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import clsx from 'clsx';

import { useStyles } from './style';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const EMAIL = 'compliance@liquidsepa.com';

const RegulationPage: FC = () => {
  const classes = useStyles();

  return (
    <Grid className={ classes.page }>
      <Header/>
      <Grid className={ classes.introSection }>
        <Grid className={ clsx(classes.wrapper, classes.introWrapper) }>
          <Typography className={ classes.introHeadline } component="h2">
            Regulation
          </Typography>
        </Grid>
      </Grid>
      <Grid className={ classes.main }>
        <Grid className={ classes.wrapper }>
          <Grid>
            <Typography className={ classes.sectionText }>
              BlockSettle AB is a licensed payment service provider in Sweden and under supervision of Sweden's
              regulator Finansinspektionen since September 2019.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Liquid SEPA is committed to upholding the highest of standards with regards to knowing our customers,
              anti-money laundering and compliance.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              On the website of Sweden's Finansinspektion you may find a link to our licence.
            </Typography>
            <Typography className={ clsx(classes.sectionText, classes.sectionTextSpaceMedium) }>
              Should you have any questions with regards to our regulatory licence or any compliance
              matter, you may reach us through <Link className={ classes.sectionLink } href={ `mailto:${ EMAIL }` } target="_blank">
                { EMAIL }
              </Link>.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Footer/>
    </Grid>
  );
};

export default RegulationPage;
