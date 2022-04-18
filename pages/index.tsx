import * as React from 'react';
import type { NextPage } from 'next';
import { AuthContext } from '../context/authContext';
import Router from 'next/router';
import APP_ROUTES from '../utils/routes';
import SidebarWithHeader from '../components/layout-components/Navbar';

const Home: NextPage = () => {
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    if (authContext.checkIfUserAuthenticated()) {
      Router.push(APP_ROUTES.HOME);
    }
  }, [authContext.user]);

  return (
      <SidebarWithHeader children={<div>Test</div>} />
  )
}

export default Home;

