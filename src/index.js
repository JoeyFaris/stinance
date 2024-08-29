import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import App from './App';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);