import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { store } from '../../store';
import { Provider } from 'react-redux';


const Main = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default Main;