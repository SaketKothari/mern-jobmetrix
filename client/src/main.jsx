import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import customFetch from './utils/customFetch.js';

const response = await customFetch.get('/test');
console.log(response);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
