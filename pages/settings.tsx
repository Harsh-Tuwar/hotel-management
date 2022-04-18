import * as React from 'react';
import type { NextPage } from 'next';
import { AuthContext } from '../context/authContext';
import Router from 'next/router';
import APP_ROUTES from '../utils/routes';
import SidebarWithHeader from '../components/layout-components/Navbar';

const Settings: NextPage = () => {
  return (
    <SidebarWithHeader>
      <div>Settings</div>
    </SidebarWithHeader>
  )
}

export default Settings;

