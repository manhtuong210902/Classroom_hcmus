import Login from "@src/pages/Auth/Login/Login";
import Signup from "@src/pages/Auth/Signup/Signup";
import HomePage from "@src/pages/HomePage";
import LandingPage from "@src/pages/LandingPage";

import settingRoutes from "@src/pages/Setting/routes";

const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    ...settingRoutes
];

export { publicRoutes };
