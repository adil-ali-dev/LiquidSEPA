import React, { FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { QueryClientProvider, QueryClient } from 'react-query';

import { GQL_HTTP_URL, LIVE } from './constants';
import { theme } from './theme';
import { Routes } from './routes';
import { NordigenProvider } from './contexts/Nordigen';
import { SessionProvider } from './contexts/Session';
import { WhitelistAddressProvider } from './contexts/WhitelistAddress';
import { BankAccountProvider } from './contexts/BankAccount';

const httpLink = createHttpLink({
  uri: GQL_HTTP_URL,
  credentials: LIVE ? 'same-origin' : 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const queryClient = new QueryClient();

export const App: FC = () => (
  <QueryClientProvider client={ queryClient }>
    <ApolloProvider client={ client }>
      <ThemeProvider theme={ theme }>
        <StylesProvider injectFirst>
          <CssBaseline/>
          <SessionProvider>
            <NordigenProvider>
              <WhitelistAddressProvider>
                <BankAccountProvider>
                  <Routes/>
                </BankAccountProvider>
              </WhitelistAddressProvider>
            </NordigenProvider>
          </SessionProvider>
        </StylesProvider>
      </ThemeProvider>
    </ApolloProvider>
  </QueryClientProvider>
);
