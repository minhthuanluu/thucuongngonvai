import Home from "../page/Home";
import Login from "../page/Login";
import FirstLayout from "../layout/FirstLayout";
import SecondLayout from "../layout/SecondLayout";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: FirstLayout,
  },
  {
    path: "/login",
    component: Login,
    layout: SecondLayout,
  },
];

export { publicRoutes };
