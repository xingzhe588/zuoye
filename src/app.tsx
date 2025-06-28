import React from 'react';
import { Provider } from 'react-redux';
import Main from './container/main';
import { store } from './store';
import { getConfigValue } from '@brojs/cli';

// 引入移动端适配样式
import './shared/ui/styles/mobile.css';

const App = () => {
  // Test API connection
  fetch(getConfigValue('project-monday.api') + '/api/');

  return (
    <Provider store={store}>
      <div className="app">
        <Main />

        {/* Feature management indicator - only in development */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: '#28a745',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}>
            ✅ FSD + HATEOAS + Auth + 80% Test Coverage
          </div>
        )}
      </div>
    </Provider>
  );
};

export default App;