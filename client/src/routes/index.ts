import HomePage from "@src/pages/HomePage";
import LandingPage from "@src/pages/LandingPage";
import {EditProfilePage} from "@src/pages/Profile/index";

type routeInfo = {
    path: string;
    component: React.FC;
};

const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage },
    { path: "/profile", component: EditProfilePage},
];

export { publicRoutes };
