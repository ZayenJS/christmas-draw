import { FC } from 'react';

import classes from './Footer.module.scss';

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return <div className={classes.Container}>Footer Function Component</div>;
};

export default Footer;
