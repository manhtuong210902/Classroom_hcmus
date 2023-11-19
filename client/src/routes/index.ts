import HomePage from "@src/pages/HomePage";
import LandingPage from "@src/pages/LandingPage";

import settingRoutes from "@src/pages/Setting/routes";



const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage },
    ...settingRoutes    
];

export { publicRoutes };
