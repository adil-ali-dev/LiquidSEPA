import React, { memo, useCallback, MouseEvent, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { Link, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { HOME_PATH, FAQ_PATH } from '../../constants';
import { rfqActions, rfqConfirmationSelector } from '../../store/Rfq';
import { useSessionContext } from '../../contexts/Session';
import { LoginAndRegisterButtonsModule } from '../../modules/LoginRegisterButtons';
import { Burger } from '../Burger';
import { useStyles } from './style';
import { sessionLoginUrlSelector, sessionRegisterUrlSelector } from '../../store/Session';


const faqRegExp = new RegExp(FAQ_PATH);


export const Header = memo(() => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const [burgerStatus, setBurgerStatus] = useState(false);

  const { statusForUI, destroy } = useSessionContext();

  const rfqConfirmation = useSelector(rfqConfirmationSelector);
  const a = useSelector(sessionRegisterUrlSelector);
  const d = useSelector(sessionLoginUrlSelector);

  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    root.style.overflow = burgerStatus ? 'hidden' : 'auto';
  }, [burgerStatus]);

  useEffect(() => {
    if (!statusForUI) return;

    setBurgerStatus(false);
  }, [statusForUI])

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
            {
              statusForUI ? (
                <Button className={ classes.headerButton } onClick={ handleLogoutClick }>
                  Logout
                </Button>
              ) : <LoginAndRegisterButtonsModule />
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});
