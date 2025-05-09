import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './state/store';
import './index.css';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
);