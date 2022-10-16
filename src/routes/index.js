import Home from "../page/Home";
import Admin from "../page/Admin";
import FirstLayout from "../layout/FirstLayout";
import SecondLayout from "../layout/SecondLayout";

const publicRoutes = [
    {
        path: '/', component: Home, layout: FirstLayout,
    },
    {
        path: '/admin', component: Admin, layout: SecondLayout,
    }
]

export { publicRoutes }