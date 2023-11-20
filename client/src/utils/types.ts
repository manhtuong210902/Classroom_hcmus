export type RouteInfo = {
    path: string;
    component: React.FC;
    layout?: React.FC;
};

export interface UserInfo {
    id: string;
    username: string;
    imgUrl: string;
    fullname?: string;
    email?: string;
    gender?: string;
}

export interface UserProfile {
    id: string;
    address: string;
    fullname: string;
    username: string;
    email: string;
    gender: string;
    imgUrl: string;
}
