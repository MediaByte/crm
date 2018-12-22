//React v16.3.1
import React from 'react'
import ReactDOM from 'react-dom'

//React Router 4 Components
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router'
import indexRoutes from 'routes/index.jsx'

//State Management
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { newUser } from 'state/newUser/reducers.js'
import { isUserAuthorized } from 'state/authentication/reducers.js'
import { userGroups } from 'state/userGroups/reducers.js'

//Styles
import 'assets/scss/material-kit-pro-react.css'

//Material-UI Theme Override
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  shadows: ['none'],
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    fontSize: 13,
  },
  palette: {
    primary: {
      main: '#0dacc4',
    },
  },
})

//Reducers
const rootReducers = combineReducers({ newUser, isUserAuthorized, userGroups })

//Initialize Redux Store
const store = createStore(
  rootReducers,
  // applyMiddleware(logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

//Initialize history object for the browser
const hist = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <MuiThemeProvider theme={theme}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} key={key} component={prop.component} />
            )
          })}
        </Switch>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
