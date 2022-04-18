import '../styles/globals.css';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { useEffect } from 'react';
import storage from '../utils/storage';
import { AuthProvider } from '../context/authContext';
import Header from '../components/ui-components/Header';
import useUser from '../lib/useUser';
import APP_ROUTES from '../utils/routes';
import { useState } from 'react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useUser({ redirectTo: APP_ROUTES.LOGIN });
  
  useEffect(() => {
    storage.init();
  }, [user]);

  return (
    <> 
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
