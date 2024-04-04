import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store.js'; // Import the persistor

import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>
  </GoogleOAuthProvider>
);
