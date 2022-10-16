import { ThemeProvider }
   from '@material-ui/core/styles';

import theme 
  from './theme';
import React
  from 'react';

import ReactDOM
  from 'react-dom';

import App
  from './containers/App/App';

import './index.css';

import { BrowserRouter as Router } 
  from "react-router-dom";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>     
    <App />
  </Router>
 
  </ThemeProvider>,
  document.getElementById('root')
);