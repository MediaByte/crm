import React, { Component } from 'react'
import DashboardMain from 'views/Dashboard/Dashboard.jsx'
import LoginPage from 'views/LoginPage/LoginPage.jsx'
import AdminPanel from 'views/Administration/Administration.jsx'
import ManageEmployees from 'views/ManageEmployees/ManageEmployees'
import userGroups from 'views/ManageUserGroups'
import EmptyNode from 'views/NodeRecords/EmptyNode'
import Landing from 'views/Landing/Landing.js'
import NodesAndProps from 'views/NodesAndProps'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardMain} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/admin/employees" component={ManageEmployees} />
        <Route path="/admin/user-groups" component={userGroups} />
        <Route path="/node/:id" component={EmptyNode} />
        <Route path="/admin/nodes-and-props" component={NodesAndProps} />
      </Switch>
    </Router>
  )
}

export default App
