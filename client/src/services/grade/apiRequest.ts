import { errorMessage } from "@src/utils/constants";
import { gradeService } from "./grade.service";
import { MessageInfo } from "@src/utils/types";
import { addGradeComposition, deleteGrade, setGradeCompositionList, updateGrade } from "@src/store/reducers/gradeSlice";

export const createGradeComposition = async (params: any, dispatch: any, classId: string): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.createGradeComposition(classId, params);
        if (res?.data?.statusCode === 201) {
            dispatch(
                addGradeComposition({
                    ...res.data.data,
                })
            );
        }

        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const getGradeCompositions = async (dispatch: any, classId: string): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.getGradeCompositions(classId);
        if (res?.data?.statusCode === 200) {
            dispatch(setGradeCompositionList(res.data.data));
        }

        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const updateGradeComposition = async (
    dispatch: any,
    classId: string,
    gradeId: string,
    params: any
): Promise<MessageInfo> => {
    if (!classId || !gradeId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.updateGradeComposition(classId, gradeId, params);
        if (res?.data?.statusCode === 200) {
            dispatch(
                updateGrade({
                    id: gradeId,
                    name: params.name,
                    scale: params.scale,
                })
            );
        }

        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const deleteGradeComposition = async (dispatch: any, classId: string, gradeId: string): Promise<MessageInfo> => {
    if (!classId || !gradeId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.deleteGradeComposition(classId, gradeId);
        if (res?.data?.statusCode === 200) {
            dispatch(deleteGrade(gradeId));
        }

        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const getGradeBoard = async (dispatch: any, classId: string): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.getGradeBoard(classId);
        console.log("log check borad", res?.data);

        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const uploadChunk = async (classId: string, fromData: any): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.uploadStudentList(classId, fromData);
        console.log("log check upload", res?.data);
        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const completeUpload = async (classId: string, randomString: string): Promise<MessageInfo> => {
    try {
        const res = await gradeService.completeUploadListStudent(classId, randomString);
        console.log("log check complete", res?.data);
        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};
