import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';

import './satoshi.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Router>
  </React.StrictMode>,
);
