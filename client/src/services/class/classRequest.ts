import { classService } from "./class.service";

export const getListClass = async () => {

    try {
        const res = await classService.getListClass();
        return res.data.data;

    } catch (error: any) {
        return error.response.data;
    }
};

export const getListUsersInClass =async (classId: string) => {
    try {
        const res = await classService.getListUsersInClass(classId);
        return res.data.data;
    } catch (error: any) {
        return error.response.data;
    }   
}



