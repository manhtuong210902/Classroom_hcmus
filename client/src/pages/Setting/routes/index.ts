import { EditProfilePage, PrivacyPage } from ".."
import SettingLayout from "../layouts/SettingLayout";


const prefix = "setting";

const settingRoutes : routeInfo[] = [
    { path: `${prefix}/profile`, component: EditProfilePage, layout: SettingLayout},
    { path: `${prefix}/privacy`, component: PrivacyPage, layout: SettingLayout}
]

export default settingRoutes;
