import React, { memo, useCallback, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { HOME_PATH, FAQ_PATH } from '../../constants';
import { rfqActions, rfqConfirmationSelector } from '../../store/Rfq';
import { useSessionContext } from '../../contexts/Session';
import { useStyles } from './style';

const faqRegExp = new RegExp(FAQ_PATH);

export const Header = memo(() => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const { status, destroy, controls } = useSessionContext();

  const rfqConfirmation = useSelector(rfqConfirmationSelector);

  // Resetting RFQ
  const handleLogoClick = useCallback(() => {
    if (!rfqConfirmation) return;

    dispatch(rfqActions.resetData());
  }, [!!rfqConfirmation]);

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
