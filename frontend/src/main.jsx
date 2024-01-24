import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store.js'; // Import the persistor

import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>
);
