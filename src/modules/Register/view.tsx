import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';

import { AUTH_EID_URL } from '../../constants';
import { withLoginDomain } from './domain';
import { Modal } from '../../components/Modal';
import { QRCode } from '../../components/QRCode';
import { AuthEidGuide } from '../../components/AuthEidGuide';
import { useStyles } from './style';


export const RegisterModule = withLoginDomain(({
  children,
  loading,
  qrValue,
  ...modalProps
}) => {
  const classes = useStyles();

  return (
    <Modal { ...modalProps }>
      <Grid className={ classes.modal }>
        <Typography variant="h2" className={ classes.headline }>
          Register with Auth eID
        </Typography>
        <QRCode loading={ loading } value={ qrValue } />
        <AuthEidGuide className={ classes.guide } />
        <Typography className={ classes.footerText }>
          Don’t have the Auth eID App?&nbsp;
          <Link href={ AUTH_EID_URL } target="_blank">
            Get started here
          </Link>
        </Typography>
      </Grid>
    </Modal>
  );
});
