import HomeLayout from "@src/layouts/HomeLayout";
import { EditProfilePage, PrivacyPage } from "..";

const prefix = "setting";

const settingRoutes: routeInfo[] = [
    { path: `${prefix}/profile`, component: EditProfilePage, layout: HomeLayout },
    { path: `${prefix}/privacy`, component: PrivacyPage, layout: HomeLayout },
];

export default settingRoutes;
