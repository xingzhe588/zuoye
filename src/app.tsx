import React from 'react';
import Main from './container/main'
import { getConfigValue } from '@brojs/cli';

const App = () => {
  fetch(getConfigValue('artcollab.api') + 'gigachat/generate');
  return <Main />;
};


export default App;