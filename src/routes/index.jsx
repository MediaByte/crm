import DashboardMain from "views/Dashboard/Dashboard.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import AdminPanel from "views/Administration/Administration.jsx";

var indexRoutes = [
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/dashboard/:id", name: "Dashboard", component: DashboardMain },
  { path: "/admin/:id", name: "Administration", component: AdminPanel, exact: true },
];

export default indexRoutes;
