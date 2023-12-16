/*
import React from 'react';
import { createRoot } from 'react-dom/client'; // 변경된 부분
import './index.css';
import Root from './Root';
import { AuthProvider } from './Context/AuthContext';

const root = createRoot(document.getElementById('root')); // 변경된 부분

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Root from './Root';
import { AuthProvider } from './Context/AuthContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <Root />
  </AuthProvider>
);