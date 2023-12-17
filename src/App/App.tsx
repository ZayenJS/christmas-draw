import { FC } from 'react';

import "../logo.svg";
import classes from './App.module.scss';

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <div className={classes.Container}>Hello from rjs!</div>
  );
}

export default App;