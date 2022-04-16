import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Loader } from '../components/ui-components/Loader';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => {
      console.log('start');
      setLoading(true);
    });

    Router.events.on('routeChangeComplete', (url) => {
      console.log('end');
      setLoading(false);
    });

    console.log('ran');
  }, []);

  return (
    <>
      {loading ? <Loader /> :
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ChakraProvider>}
    </>
  );
}

export default MyApp;
