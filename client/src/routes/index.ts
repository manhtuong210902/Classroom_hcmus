import HomePage from "@src/pages/HomePage";
import LandingPage from "@src/pages/LandingPage";

type routeInfo = {
    path: string;
    component: React.FC;
};

const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage },
];

export { publicRoutes };
