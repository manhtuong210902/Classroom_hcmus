export type routeInfo = {
    path: string;
    component: React.FC;
    layout?: React.FC;
};

export interface userInfo {
    id: string;
    name: string;
    fullname: string;
    email: string;
}
