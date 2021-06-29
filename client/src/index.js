import "bootstrap/dist/css/bootstrap.min.css";

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as AuthProvider } from "./context/AuthContext";

import App from './App';

ReactDOM.render(
     <AuthProvider>
      <App />
    </AuthProvider>,
  document.getElementById('root')
);