import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Props } from './typedef';
import { Modal } from '../Modal';
import { LogoIcon } from '../../assets/Icons';
import { useStyles } from './style';

export const WelcomeModal = memo<Props>(modalProps => {
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
      </Grid>
    </Modal>
  );
});
