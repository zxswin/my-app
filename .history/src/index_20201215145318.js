import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router basename="/">
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
