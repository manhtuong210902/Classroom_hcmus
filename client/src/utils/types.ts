export type RouteInfo = {
    path: string;
    component: React.FC;
    layout?: React.FC | null;
};

export interface UserInfo {
    id: string;
    username: string;
    imgUrl: string;
    fullname?: string;
    email?: string;
    address?: string;
    gender?: string;
}
