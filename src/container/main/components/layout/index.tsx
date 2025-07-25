import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/index';
import { getNavigationValue } from '@brojs/cli';

const Layout = (): React.ReactElement => {
  const location = useLocation();
  // 判断当前是否为登录注册页
  const isAuthPage = location.pathname === getNavigationValue('project-monday.auth');
  return (
    <>
      <Header isAuthPage={isAuthPage} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;