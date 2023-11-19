import HomeLayout from "@src/layouts/HomeLayout";
import { EditProfilePage } from "..";

const prefix = "setting";

const settingRoutes: routeInfo[] = [{ path: `${prefix}/profile`, component: EditProfilePage, layout: HomeLayout }];

export default settingRoutes;
