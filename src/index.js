import React from "react";

//React Router v4
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";

//State Management
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { newUser } from 'state/newUser/reducers.js';
import { isUserAuthorized } from 'state/authentication/reducers.js';
import { sideBar } from 'state/App/reducers.js'
import { createLogger } from 'redux-logger';

import "assets/scss/material-dashboard-pro-react.css?v=1.3.0";

//Material-UI Theme Override
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
    	main: '#0dacc4',
    }
  },
});

//Reducers
const rootReducers = combineReducers({ newUser, isUserAuthorized, sideBar });

//Redux Middleware for debugging components
const logger = createLogger();

//Initialize Redux Store
const store = createStore(rootReducers, applyMiddleware(logger));

const hist = createBrowserHistory();

ReactDOM.render(
<Provider store={store}>
<MuiThemeProvider theme={theme}>
  <Router history={hist}>
	    <Switch>
	      {indexRoutes.map((prop, key) => {
	        return <Route path={prop.path} key={key} component={prop.component} />;
	      })}
	    </Switch>
  </Router>
</MuiThemeProvider>
</Provider>,
  document.getElementById("root")
);
