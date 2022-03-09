import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

import { Modal } from '../../components/Modal';
import { withWelcomeDomain } from './domain';
import { LogoIcon } from '../../assets/Icons';
import { useStyles } from './style';

export const WelcomeModule = withWelcomeDomain(modalProps => {
  const classes = useStyles();

  return (
    <Modal { ...modalProps }>
      <Grid className={ classes.modal }>
        <LogoIcon className={ classes.brand } />

        <Typography className={ classes.modalHeadline }>
          Welcome to BlockSettle
        </Typography>

        <Typography className={ classes.modalMessage }>
          To complete your onboarding
        </Typography>

        <Grid className={ classes.steps }>
          <ul className={ classes.stepsList }>
            <li className={ classes.step }>
              Whitelist a Liquid Address.
            </li>
            <li className={ classes.step }>
              Verify your bank account.
            </li>
          </ul>
        </Grid>

        <Button
          className={ classes.button }
          variant="contained"
          color="primary"
          onClick={ modalProps.handleClose }
        >
          Continue
        </Button>
      </Grid>
    </Modal>
  );
});
