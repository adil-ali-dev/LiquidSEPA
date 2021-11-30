import React, { memo, useCallback, MouseEvent, useMemo } from 'react';
import { Grid, Button, Typography, Link as MuiLink, CircularProgress } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import QRCode from 'react-qr-code';
import clsx from 'clsx';

import { HOME_PATH, FAQ_PATH } from '../../constants';
import { useDeliveringFormStatusContext } from '../../contexts/DeliveringForm';
import { useSessionContext } from '../../contexts/Session';
import { Modal } from '../Modal';
import { AuthEidLogoIcon } from '../../assets/Icons';
import { useStyles } from './style';

const faqRegExp = new RegExp(FAQ_PATH);

export const Header = memo(() => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const { setNext } = useDeliveringFormStatusContext();
  const { status, destroy, controls } = useSessionContext();

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
    controls.openRegister();
  };

  const handleLoginClick = () => {
    controls.openLogin();
  };

  const handleLogoutClick = () => destroy();

  return (
    <Grid className={ classes.headerContainer }>
      <Grid className={ classes.header }>
        <Grid className={ classes.headerWrapper }>
          <Link className={ classes.headerLogoLink } to={ HOME_PATH } onClick={ handleLogoClick }>
            Liquid SEPA
          </Link>
          <Grid className={ classes.headerLinks }>
            <Link className={ classes.headerLink } to={ FAQ_PATH } onClick={ handleFAQClick }>
              FAQ
            </Link>
            { status
              ? (
                <Button className={ classes.headerButton } onClick={ handleLogoutClick }>
                  Logout
                </Button>
              )
              : (
                <>
                  <Button className={ classes.headerButton } onClick={ handleLoginClick }>
                    Login
                  </Button>
                  <Button
                    className={ clsx(classes.headerButton, classes.registerButton) }
                    onClick={ handleRegisterClick }
                  >
                    Register
                  </Button>
                </>
              ) }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
