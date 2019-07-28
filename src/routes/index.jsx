import DashboardMain from 'views/Dashboard/Dashboard.jsx'
import LoginPage from 'views/LoginPage/LoginPage.jsx'
import AdminPanel from 'views/Administration/Administration.jsx'
import ManageEmployees from 'views/ManageEmployees/ManageEmployees'
import ManageUserGroups from 'views/ManageUserGroups/ManageUserGroups'
import EmptyNode from 'views/NodeRecords/EmptyNode'
import Landing from 'views/Landing/Landing.js'
import NodesAndProps from 'views/NodesAndProps'

var indexRoutes = [
  { path: '/login', name: 'LoginPage', component: LoginPage },
  {
    path: '/pinecone/dashboard/:id',
    name: 'Dashboard',
    component: DashboardMain,
  },
  {
    path: '/admin/:id',
    name: 'Administration',
    component: AdminPanel,
    exact: true,
  },
  {
    path: '/management/employees',
    name: 'Administration',
    component: ManageEmployees,
  },
  {
    path: '/management/user-groups',
    name: 'Manage User Groups',
    component: ManageUserGroups,
  },
  {
    path: '/management/empty-node/:id',
    name: 'Empty Node',
    component: EmptyNode,
  },
  {
    path: '/management/nodes-and-props',
    name: 'Manage Nodes And Props',
    component: NodesAndProps,
  },
  { path: '/', name: 'Administration', component: Landing },
]

export default indexRoutes
