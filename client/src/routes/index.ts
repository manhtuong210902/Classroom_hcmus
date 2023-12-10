import routes from "@src/configs/router";
import AuthLayout from "@src/layouts/AuthLayout";
import HomeLayout from "@src/layouts/HomeLayout";
import Login from "@src/pages/Auth/Login/Login";
import LoginSuccess from "@src/pages/Auth/Login/LoginSuccess";
import RequestResetPassword from "@src/pages/Auth/RequestResetPassword/RequestResetPassword";
import ResetPassword from "@src/pages/Auth/ResetPassword/ResetPassword";
import Signup from "@src/pages/Auth/Signup/Signup";
import VerifyEmail from "@src/pages/Auth/Verify/VerifyEmail";
import ClassPage from "@src/pages/Class/ClassPage";
import InvitePage from "@src/pages/Class/InvitePage";
import HomePage from "@src/pages/Home/HomePage";
import LandingPage from "@src/pages/Landing/LandingPage";
import NotFoundPage from "@src/pages/NotFound/NotFoundPage";
import settingRoutes from "@src/pages/Setting/routes";
import { RouteInfo } from "@src/utils/types";

const publicRoutes: RouteInfo[] = [
    { path: routes.LANDINGPAGE, component: LandingPage },
    { path: routes.LOGIN, component: Login, layout: AuthLayout },
    { path: routes.SIGNUP, component: Signup, layout: AuthLayout },
    { path: routes.LOGIN_GG_SUCCESS, component: LoginSuccess, layout: null },
    { path: routes.LOGIN_FB_SUCCESS, component: LoginSuccess, layout: null },
    { path: routes.REQUEST_RESET_PASSWORD, component: RequestResetPassword, layout: AuthLayout },
    { path: routes.REST_PASSWORD, component: ResetPassword, layout: AuthLayout },
    { path: routes.VERIFY, component: VerifyEmail, layout: null },
];

const privateRoutes: RouteInfo[] = [
    { path: routes.HOME, component: HomePage, layout: HomeLayout },
    { path: routes.CLASS, component: ClassPage, layout: HomeLayout },
    { path: routes.INVITE, component: InvitePage, layout: HomeLayout },
    { path: routes.NOT_FOUND, component: NotFoundPage, layout: HomeLayout },
    ...settingRoutes,
];

export { publicRoutes, privateRoutes };
