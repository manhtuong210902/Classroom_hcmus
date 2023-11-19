import AuthLayout from "@src/layouts/AuthLayout";
import HomeLayout from "@src/layouts/HomeLayout";
import Login from "@src/pages/Auth/Login/Login";
import Signup from "@src/pages/Auth/Signup/Signup";
import HomePage from "@src/pages/Home/HomePage";
import LandingPage from "@src/pages/Landing/LandingPage";
import settingRoutes from "@src/pages/Setting/routes";

type routeInfo = {
    path: string;
    component: React.FC;
    layout?: React.FC;
};

const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage, layout: HomeLayout },
    { path: "/login", component: Login, layout: AuthLayout },
    { path: "/signup", component: Signup, layout: AuthLayout },
    ...settingRoutes,
];

export { publicRoutes };
