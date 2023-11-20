import routes from "@src/configs/router";
import AuthLayout from "@src/layouts/AuthLayout";
import HomeLayout from "@src/layouts/HomeLayout";
import Login from "@src/pages/Auth/Login/Login";
import Signup from "@src/pages/Auth/Signup/Signup";
import HomePage from "@src/pages/Home/HomePage";
import LandingPage from "@src/pages/Landing/LandingPage";
import settingRoutes from "@src/pages/Setting/routes";
import { RouteInfo } from "@src/utils/types";

const publicRoutes: RouteInfo[] = [
    { path: routes.LANDINGPAGE, component: LandingPage },
    { path: routes.LOGIN, component: Login, layout: AuthLayout },
    { path: routes.SIGNUP, component: Signup, layout: AuthLayout },
];

const privateRoutes: RouteInfo[] = [{ path: routes.HOME, component: HomePage, layout: HomeLayout }, ...settingRoutes];

export { publicRoutes, privateRoutes };
