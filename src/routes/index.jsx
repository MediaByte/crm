import Dashboard from "views/Dashboard/Dashboard.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

var indexRoutes = [
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/Dashboard/:view?", name: "Dashboard", component: Dashboard },
  { path: "/", name: "LoginPage", component: LoginPage }
];

export default indexRoutes;
