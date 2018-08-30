//React v16.3.1
import React from "react";
import ReactDOM from "react-dom";

//React Router 4 Components
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";
import indexRoutes from "routes/index.jsx";

//State Management
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { newUser } from 'state/newUser/reducers.js';
import { isUserAuthorized } from 'state/authentication/reducers.js';
import { createLogger } from 'redux-logger';

//Styles
import "assets/scss/material-kit-pro-react.css";

//Reducers
const rootReducers = combineReducers({ newUser, isUserAuthorized });

//Redux Middleware for debugging components
const logger = createLogger();

//Initialize Redux Store
const store = createStore(rootReducers, applyMiddleware(logger));

//Initialize history object for the browser
const hist = createBrowserHistory();

ReactDOM.render(
<Provider store={store}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>
</Provider>,
  document.getElementById("root")
);
