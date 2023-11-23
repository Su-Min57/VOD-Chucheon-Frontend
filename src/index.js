import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import { AuthProvider } from './Context/AuthContext'; 

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
