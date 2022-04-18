import * as React from 'react';
import type { NextPage } from 'next';
import SidebarWithHeader from '../components/layout-components/Navbar';

const Home: NextPage = () => {
  return (
    <SidebarWithHeader>
      <div>Home</div>
    </SidebarWithHeader>
  )
}

export default Home;

