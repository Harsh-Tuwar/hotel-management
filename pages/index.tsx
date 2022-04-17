import * as React from 'react';
import { Box, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { AuthContext } from '../context/authContext';
import Router from 'next/router';
import APP_ROUTES from '../utils/routes';

const Home: NextPage = () => {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    if (authContext.checkIfUserAuthenticated()) {
      Router.push(APP_ROUTES.HOME);
    }
  }, [authContext.user]);

  return (
    <Box>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/forgot-password">
            <a>Forgot Password</a>
          </Link>
        </li>
        <li>
          <Button colorScheme='blue' onClick={authContext.logout}>Logout</Button>
        </li>
      </ul>
    </Box>
  )
}

export default Home;

