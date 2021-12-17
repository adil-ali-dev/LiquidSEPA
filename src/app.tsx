import React, { FC } from 'react';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { theme } from './theme';
import { store, persistor } from './store';
import { Routes } from './routes';
import { SessionProvider } from './contexts/Session';
import { WhitelistAddressProvider } from './contexts/WhitelistAddress';
import { BankAccountProvider } from './contexts/BankAccount';


const queryClient = new QueryClient();


export const App: FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            <SessionProvider>
              <WhitelistAddressProvider>
                <BankAccountProvider>
                  <Routes />
                </BankAccountProvider>
              </WhitelistAddressProvider>
            </SessionProvider>
          </StylesProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
