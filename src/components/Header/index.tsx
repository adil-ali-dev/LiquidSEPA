import React, { memo, useCallback, MouseEvent, useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { HOME_PATH, FAQ_PATH } from '../../constants';
import { rfqActions, rfqConfirmationSelector } from '../../store/Rfq';
import { useSessionContext } from '../../contexts/Session';
import { useStyles } from './style';
import { Burger } from '../Burger';

const faqRegExp = new RegExp(FAQ_PATH);

export const Header = memo(() => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const [burgerStatus, setBurgerStatus] = useState(false);

  const { status, destroy, controls } = useSessionContext();

  const rfqConfirmation = useSelector(rfqConfirmationSelector);

  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    root.style.overflow = burgerStatus ? 'hidden' : 'auto';
  }, [burgerStatus]);

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

  const handleBurgerClick = useCallback(() => {
    setBurgerStatus(prevStatus => !prevStatus);
  }, []);

  return (
    <Grid className={ classes.headerContainer }>
      <Grid className={ clsx(classes.header, burgerStatus && classes.headerOpen) }>
        <Grid className={ classes.headerWrapper }>
          <Grid className={ classes.headerWrapperMobile }>
            <Link className={ classes.headerLogoLink } to={ HOME_PATH } onClick={ handleLogoClick }>
              BlockSettle
            </Link>
            <Burger status={burgerStatus} handleClick={handleBurgerClick}/>
          </Grid>
          <Grid className={ clsx(classes.headerLinks, burgerStatus && classes.headerLinksOpen) }>
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
