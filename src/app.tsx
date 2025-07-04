import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Main from './container/main';
import { store } from './store';
import { getConfigValue } from '@brojs/cli';
import { getCurrentUser } from './features/auth/model/authStore';

// 引入移动端适配样式
import './shared/ui/styles/mobile.css';

const AutoAuth: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
  return <Main />;
};

const App = () => {
  // Test API connection
  fetch(getConfigValue('project-monday.api') + '/api/');

  return (
    <Provider store={store}>
      <div className="app">
        <AutoAuth />
      </div>
    </Provider>
  );
};

export default App;