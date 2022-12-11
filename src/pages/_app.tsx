/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/head';

import Page from '../components/Page';

import 'react-lazy-load-image-component/src/effects/blur.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-image-lightbox/style.css';
import 'aos/dist/aos.css';
import {ApolloClient, ApolloLink, ApolloProvider, createHttpLink, DefaultOptions, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import {Toaster} from 'react-hot-toast';
import {NODE_ENV} from '../utils/NODE_ENV';

const httpLink = createHttpLink({
  uri: NODE_ENV === 'development' ? 'http://localhost:4444/graphql' : '/graphql',
});

const logoutLink = onError((networkError) => {
  const graphQLErrors = networkError.graphQLErrors;
  if (graphQLErrors && graphQLErrors[0]?.message === 'Unauthorized') {
    window.location.href = '/signin?returnUrl=' + window.location.href;
  }
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: ApolloLink.from([logoutLink, authLink, httpLink]),
  cache: new InMemoryCache({
    resultCaching: false
  }),
  defaultOptions: defaultOptions,
});


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function App({Component, pageProps}): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <Toaster position="top-center"/>
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>OVB</title>
        </Head>
        <Page>
          <Component {...pageProps} />
        </Page>
      </React.Fragment>
    </ApolloProvider>
  );
}
