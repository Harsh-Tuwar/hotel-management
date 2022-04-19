import * as React from 'react';
import type { NextPage } from 'next';
import SidebarWithHeader from '../components/layout-components/Navbar';

const Pets: NextPage = () => {
  return (
    <SidebarWithHeader>
      <div>Pets</div>
    </SidebarWithHeader>
  )
}

export default Pets;

