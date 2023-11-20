import HomeLayout from "@src/layouts/HomeLayout";
import { EditProfilePage, PrivacyPage } from "..";
import { RouteInfo } from "@src/utils/types";

const prefix = "setting";

const settingRoutes: RouteInfo[] = [
    { path: `${prefix}/profile`, component: EditProfilePage, layout: HomeLayout },
    { path: `${prefix}/privacy`, component: PrivacyPage, layout: HomeLayout },
];

export default settingRoutes;
