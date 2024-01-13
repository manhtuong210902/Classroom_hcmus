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

export interface GradeInfo {
    id: string;
    classId: string;
    gradeId: string;
    name: string;
    studentId: string;
    fullName: string;
    grade: number;
    scale: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ReviewInfo {
    id: string;
    classId: string;
    gradeId: string;
    gradeName: string;
    currentGrade: number;
    expectedGrade: number;
    explaination: string;
    fullName: string;
    createdAt?: string;
    updatedAt?: string;
    studentId: string;
}

export interface CommentInfo {
    id: string;
    reviewId: string;
    userId: string;
    fullName: string;
    imgUrl: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}
