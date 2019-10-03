import React from 'react'
import ScrollToTop from 'components/ScrollTop/ScrollTop'
import Landing from 'views/Landing/Landing.js'
import DashboardMain from 'views/Dashboard/Dashboard.jsx'
import LoginPage from 'views/LoginPage/LoginPage.jsx'
import AdminPanel from 'views/Administration/Administration.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ManageEmployees from 'views/ManageEmployees/ManageEmployees'
import userGroups from 'views/ManageUserGroups'
import EmptyNode from 'views/NodeRecords/EmptyNode'
import NodesAndProps from 'views/NodesAndProps'

export default () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={DashboardMain} />
        <Route exact path="/node/:id" component={EmptyNode} />
        <Route exact path="/admin" component={AdminPanel} />
        <Route exact path="/admin/employees" component={ManageEmployees} />
        <Route exact path="/admin/user-groups" component={userGroups} />
        <Route path="/admin/user-groups/:id" component={userGroups} />
        <Route exact path="/admin/nodes-and-props" component={NodesAndProps} />
        <Route
          exact
          path="/admin/nodes-and-props/:id"
          component={NodesAndProps}
        />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
)
