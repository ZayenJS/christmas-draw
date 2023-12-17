import { FC, ReactNode } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import classes from './Layout.module.scss';

export interface LayoutProps {
  children?: ReactNode | ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.Container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
