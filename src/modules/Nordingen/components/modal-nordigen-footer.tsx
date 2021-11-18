import React, { memo, useMemo } from 'react';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { ModalFooterProps } from '../typedef';
import { useStyles } from '../style';

export const ModalNordigenFooter = memo<ModalFooterProps>(({
  address,
  step,
  disabled,
  final,
  error,
  bankSelected,
  completed,
  loading
}) => {
  const classes = useStyles();

  const buttonText = useMemo(() => {
    if (!step || final || !bankSelected || error) return 'Continue';

    return 'Launch Nordigen';
  }, [step, final, error, bankSelected]);

  return (
    <Grid className={ clsx(classes.modalFooter, step && classes.modalFooterSpace) }>
      {
        step ? (
          <>
            <Typography className={ classes.modalFooterLabel }>
              Whitelisted Liquid address
            </Typography>
            <Typography className={ classes.modalFooterText }>
              { address }
            </Typography>
          </>
        ) : (
          <Typography className={ classes.modalFooterText }>
            Associate a Liquid address with your IBAN in case any future transactions require a refund.
          </Typography>
        )
      }
      <Button
        className={ clsx(classes.button, classes.modalFooterButton) }
        disabled={ disabled || loading || (final && !completed && !error) }
        type="submit"
        variant="contained"
        color="primary"
      >
        {
          loading || (final && !completed && !error)
            ? <CircularProgress className={ classes.buttonIndicator } color="inherit" size={ 21 }/>
            : buttonText
        }
      </Button>
    </Grid>
  );
});
