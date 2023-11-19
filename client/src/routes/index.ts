import Login from "@src/pages/Auth/Login/Login";
import Signup from "@src/pages/Auth/Signup/Signup";
import HomePage from "@src/pages/HomePage";
import LandingPage from "@src/pages/LandingPage";
import { EditProfilePage } from "@src/pages/Profile/index";

type routeInfo = {
    path: string;
    component: React.FC;
};

const publicRoutes: routeInfo[] = [
    { path: "/", component: LandingPage },
    { path: "/home", component: HomePage },
    { path: "/profile", component: EditProfilePage },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
];

export { publicRoutes };
