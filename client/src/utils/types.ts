export type routeInfo = {
    path: string;
    component: React.FC;
    layout?: React.FC;
};

export interface userInfo {
    id: string;
    username: string;
    imgUrl: string;
}
