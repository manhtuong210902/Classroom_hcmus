import { EditProfilePage, PrivacyPage } from ".."


const prefix = "setting";

const settingRoutes : routeInfo[] = [
    { path: `${prefix}/profile`, component: EditProfilePage},
    { path: `${prefix}/privacy`, component: PrivacyPage}
]

export default settingRoutes;