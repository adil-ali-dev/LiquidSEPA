import React, { memo, useCallback, MouseEvent, useState } from 'react';
import { Grid, Button, Typography, Link as MuiLink } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import QRCode from 'qrcode.react';
import clsx from 'clsx';

import { HOME_PATH, FAQ_PATH } from '../../constants';
import { useDeliveringFormStatusContext } from '../../contexts/DeliveringForm';
import { useStyles } from './style';
import { Modal } from '../Modal';
import { AuthEidLogoIcon } from '../../assets/Icons';

const faqRegExp = new RegExp(FAQ_PATH);

export const Header = memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const { setNext } = useDeliveringFormStatusContext();

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

  return (
    <>
      <Grid className={ classes.headerContainer }>
        <Grid className={ classes.header }>
          <Grid className={ classes.headerWrapper }>
            <Link className={ classes.headerLogoLink } to={ HOME_PATH } onClick={ handleLogoClick }>
              DigitalEights
            </Link>
            <Grid className={ classes.headerLinks }>
              <Link className={ classes.headerLink } to={ FAQ_PATH } onClick={ handleFAQClick }>
                FAQ
              </Link>
              <Button className={ classes.headerButton } onClick={ () => setShowModal(true) }>
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
          <Grid className={ classes.registerQrWrapper }>
            <QRCode value="http://autheid.com"/>
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
