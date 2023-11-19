import HomeLayout from "@src/layouts/HomeLayout";
import HomePage from "@src/pages/HomePage";
import LandingPage from "@src/pages/LandingPage";
import { EditProfilePage } from "@src/pages/Profile/index";

type routeInfo = {
    path: string;
    component: React.FC;
    layout?: React.FC;
};

const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage, layout: HomeLayout },
    { path: "/profile", component: EditProfilePage, layout: HomeLayout },
];

export { publicRoutes };
