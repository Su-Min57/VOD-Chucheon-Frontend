import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './Root';
import './index.css';
import configureStore from './redux/configureStore';
import reportWebVitals from './reportWebVitals';

const store = configureStore();

const root = document.getElementById('root');
const rootInstance = createRoot(root);
rootInstance.render(<Root store={store} />);

reportWebVitals();