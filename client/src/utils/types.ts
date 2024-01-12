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
    studentId?: string;
}

export interface ClassInfo {
    id: string;
    description?: string;
    name: string;
    owner: string;
    subject?: string;
    title?: string;
    creator: string;
    avatar?: string;
    isTeacher: boolean;
    isCreator: boolean;
}

export interface MessageInfo {
    statusCode: number;
    message: string;
}

export interface GradeComposition {
    id: string;
    classId: string;
    isFinal: boolean;
    name: string;
    scale: number;
}
