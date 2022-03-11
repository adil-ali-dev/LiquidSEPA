import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { PROD } from '../../constants';
import { DeliveringFormStatusProvider } from '../../contexts/DeliveringForm';
import { DeliveringFormModule } from '../../modules/DeliveringForm';
import { AssetsTableModule } from '../../modules/AssetsTable';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useStyles } from './style';

export const HomePage: FC = () => {
  const classes = useStyles();

  return (
    <DeliveringFormStatusProvider>
      <Grid className={ classes.page }>
        <Header/>
        <Grid className={ classes.introSection }>
          <Grid className={ clsx(classes.wrapper, classes.introWrapper) }>
            <Grid>
              <Typography className={ classes.introHeadline } component="h2">
                Buy and Sell<br/>
                Liquid Network assets
              </Typography>
              <Typography className={ classes.introSubHeadline } component="p">
                {PROD ? 'Coming soon' : 'Instant SEPA bank settlement in 60 seconds or less' }
              </Typography>
            </Grid>
            <Grid className={ classes.introForm }>
              <DeliveringFormModule/>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={ classes.assetsSection }>
          <Grid className={ classes.wrapper }>
            <AssetsTableModule/>
          </Grid>
        </Grid>
        <Footer/>
      </Grid>
    </DeliveringFormStatusProvider>
  );
};
