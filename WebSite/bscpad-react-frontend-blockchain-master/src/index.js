import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import "./assets/css/bootstrap.min.css";
import App from './App';

import reportWebVitals from './reportWebVitals';
import { DAppProvider, ChainId } from '@usedapp/core'

ReactDOM.render(
  <DAppProvider config={{}}>
    <Router>
      <App />
    </Router>
  </DAppProvider>,
  document.getElementById('root')
);

reportWebVitals();
