import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import { FAQ_PATH, HOME_PATH } from './constants';
import { HomePage } from './pages/Home';
import { FAQPage } from './pages/FAQ';
import { WhitelistAddressModule } from './modules/WhitelistAddress';
import { BankAccountModule } from './modules/BankAccount';
import { LoginModule } from './modules/Login';
import { RegisterModule } from './modules/Register';

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    return history.listen(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return null;
});

export const Routes: FC = () => (
  <BrowserRouter>
    <ScrollToTop/>
    <Route path={ HOME_PATH } exact component={ HomePage }/>
    <Route path={ HOME_PATH } component={ LoginModule }/>
    <Route path={ HOME_PATH } component={ RegisterModule }/>
    <Route path={ HOME_PATH } component={ BankAccountModule }/>
    <Route path={ HOME_PATH } component={ WhitelistAddressModule }/>
    <Route path={ FAQ_PATH } component={ FAQPage }/>
  </BrowserRouter>
);
