import DashboardMain from "views/Dashboard/Dashboard.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import AdminPanel from "views/Administration/Administration.jsx";
import PasswordRules from "views/Administration/PasswordRules.jsx";
import ManageEmployees from "views/Administration/ManageEmployees.jsx";
import Landing from "views/Landing/Landing.js";

var indexRoutes = [
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/dashboard/:id", name: "Dashboard", component: DashboardMain },
  { path: "/admin/:id", name: "Administration", component: AdminPanel, exact: true },
  { path: "/passwordrules", name: "Administration", component: PasswordRules },
  { path: "/management/employees", name: "Administration", component: ManageEmployees },
  { path: "/", name: "Administration", component: Landing },

];

export default indexRoutes;
