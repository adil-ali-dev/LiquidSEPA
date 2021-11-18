import React, { memo, useCallback, MouseEvent, useState } from 'react';
import { Grid, Button, Typography, Link as MuiLink, CircularProgress } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import QRCode from 'react-qr-code';
import clsx from 'clsx';

import { HOME_PATH, FAQ_PATH } from '../../constants';
import { useDeliveringFormStatusContext } from '../../contexts/DeliveringForm';
import { useStyles } from './style';
import { Modal } from '../Modal';
import { AuthEidLogoIcon } from '../../assets/Icons';
import { useAuthEidSignup } from '../../graphql/Auth/hooks';

const faqRegExp = new RegExp(FAQ_PATH);

export const Header = memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { setNext } = useDeliveringFormStatusContext();
  // @ts-ignore
  const { data, authEidSignup, loading, error } = useAuthEidSignup();

  const [showModal, setShowModal] = useState(false);

  const handleLogoClick = useCallback(() => {
    setNext(false);
  }, []);

  const handleFAQClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (faqRegExp.test(pathname)) {
      event.preventDefault();
      history.goBack();
    }
  }, [pathname]);

  const handleRegisterClick = () => {
    setShowModal(true);
    authEidSignup();
  };

  const renderQr = () => {
    if (loading) return <CircularProgress/>;
    if (error || !data?.requestId) {
      return <Typography align="center">There was an error fetching Auth eID request data</Typography>;
    }
    if (data?.requestId) {
      return <QRCode value={ `https://autheid.com/app/requests/?request_id=${ data.requestId }` } size={ 180 }/>;
    }
  };

  return (
    <>
      <Grid className={ classes.headerContainer }>
        <Grid className={ classes.header }>
          <Grid className={ classes.headerWrapper }>
            <Link className={ classes.headerLogoLink } to={ HOME_PATH } onClick={ handleLogoClick }>
              LiquidSEPA
            </Link>
            <Grid className={ classes.headerLinks }>
              <Link className={ classes.headerLink } to={ FAQ_PATH } onClick={ handleFAQClick }>
                FAQ
              </Link>
              <Button className={ classes.headerButton } onClick={ () => {} }>
                Login
              </Button>
              <Button className={ clsx(classes.headerButton, classes.registerButton) } onClick={ handleRegisterClick }>
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Modal status={ showModal } handleClose={ () => setShowModal(false) }>
        <Grid className={ classes.registerModal }>
          <Typography variant="h2" className={ classes.registerHeading }>
            Register with Auth eID
          </Typography>
          <Grid
            className={ clsx(
              classes.registerQrWrapper,
              (error || (!data?.requestId && !loading)) && classes.registerQrEmpty
            ) }
          >
            { renderQr() }
          </Grid>
          <Grid className={ classes.registerInfoBox }>
            <Grid className={ classes.registerInfoBoxIconWrap }>
              <AuthEidLogoIcon/>
            </Grid>
            <Grid>
              <Typography
                className={ classes.registerInfoBoxText }
              >
                1. Open the Auth eID App on your mobile phone.
              </Typography>
              <Typography
                className={ classes.registerInfoBoxText }
              >
                2. Tap the QR symbol on the Auth eID App.
              </Typography>
              <Typography
                className={ classes.registerInfoBoxText }
              >
                3. Point the camera at the QR code in this field.
              </Typography>
            </Grid>
          </Grid>
          <Typography className={ clsx(classes.registerInfoBoxText, classes.noAppNotice) }>
            Don’t have the Auth eID App?&nbsp;
            <MuiLink href="https://autheid.com" target="_blank">
              Get started here
            </MuiLink>
          </Typography>
        </Grid>
      </Modal>
    </>
  );
});
