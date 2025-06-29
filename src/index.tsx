import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';
import './i18n'; // 导入国际化配置

import './app-env.d.ts';

export default () => <App/>;

let rootElement: ReactDOM.Root | null = null;

export const mount = (Component, element = document.getElementById('app')) => {
  if (!rootElement) {
    rootElement = ReactDOM.createRoot(element as HTMLElement);
  }
  rootElement!.render(<Component/>);

  if(module.hot) {
      module.hot.accept('./app', ()=> {
        rootElement && rootElement.render(<Component/>);
      })
  }
};

export const unmount = () => {
  rootElement.unmount();
};

// Auto-mount the app when this module is loaded
const appElement = document.getElementById('app');
if (appElement) {
  mount(App, appElement);
}
