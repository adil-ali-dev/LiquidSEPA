import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';

import { ModalHeaderProps } from '../typedef';
import { useStyles } from '../style';
import { Step } from '../../../components/Step';
import { IbanService } from '../../../services';

export const ModalNordigenHeader = memo<ModalHeaderProps>(({ iban, step, error, completed }) => {
  const classes = useStyles();

  return (
    <Grid className={ classes.modalHeader }>
      <Typography className={ classes.modalHeadline }>
        Welcome to Liquid SEPA
      </Typography>
      <Typography className={ classes.modalSubHeadline }>
        Let&apos;s get your account setup
      </Typography>
      <Typography className={ classes.modalIban }>
        { IbanService.format(iban) }
      </Typography>
      <Grid className={ classes.modalSteps }>
        <Grid className={ classes.modalStepConnector }/>
        <Step
          label="Whitelist"
          active={ !step }
          completed={ !!step }
        />
        <Step
          label="Verify"
          error={ error }
          active={ !error && !!step }
          completed={ completed }
        />
      </Grid>
    </Grid>
  );
});
