import { FC } from 'react';

import classes from './Header.module.scss';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return <div className={classes.Container}>Header Function Component</div>;
};

export default Header;
