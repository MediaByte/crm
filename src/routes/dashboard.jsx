import Dashboard from "views/Dashboard/Dashboard.jsx";
import AdminPanel from "views/Administration/Administration.jsx";
import ManageEmployees from 'views/Administration/ManageEmployees.jsx';
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Laptop from "@material-ui/icons/Laptop";
import Event from '@material-ui/icons/Event';
import AccountBalance from '@material-ui/icons/AccountBalance';
import CreditCard from '@material-ui/icons/CreditCard';
import MailOutline from '@material-ui/icons/MailOutline';
var dashRoutes = [
  { path: "/dashboard", name: "Dashboard", icon: DashboardIcon, component: Dashboard },
  { path: "/tasks", name: "Tasks", icon: 'fas fa-tasks', component: null },
  { path: "/people", name: "People", icon: PeopleIcon, component: null },
  { path: "/administration", name: "Administration", icon: Laptop, component: AdminPanel },
  { path: "/employees", name: "Manage Employees", icon: Laptop, component: ManageEmployees },
  { path: "/events", name: "Events", icon: Event, component: null },
  { path: "/agencies", name: "Agencies", icon: AccountBalance, component: null },
  { path: "/expenses", name: "Expenses", icon: CreditCard, component: null },
  { path: "/mail", name: "Mass Email", icon: MailOutline, component: null },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;