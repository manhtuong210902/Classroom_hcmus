import { errorMessage } from "@src/utils/constants";
import { gradeService } from "./grade.service";
import { MessageInfo } from "@src/utils/types";
import { saveAs } from "file-saver";
import {
    addGradeComposition,
    deleteGrade,
    setGradeCompositionList,
    setGradeStudentList,
    setLoadingStudentList,
    updateGrade,
} from "@src/store/reducers/gradeSlice";
import { ExportType, FileType } from "@src/utils/enum";

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
    dispatch(setLoadingStudentList(true));
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.getGradeBoard(classId);
        const listGrade = Object.values(
            res?.data?.data?.list.reduce((acc: any, student: any) => {
                if (!acc[student?.studentId]) {
                    acc[student?.studentId] = {
                        studentId: student?.studentId,
                        fullName: student?.fullName,
                    };
                }
                acc[student?.studentId][student?.name] = {
                    gradeId: student?.gradeId,
                    grade: student?.grade || 0,
                    scale: student?.scale,
                };
                return acc;
            }, {})
        );

        dispatch(setGradeStudentList(listGrade));
        dispatch(setLoadingStudentList(false));

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

export const completeUpload = async (
    classId: string,
    randomString: string,
    fileType: FileType
): Promise<MessageInfo> => {
    try {
        const res = await gradeService.completeUploadListStudent(classId, randomString, fileType);
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

export const exportFile = async (
    classId: string,
    exportType: ExportType,
    isExport: boolean,
    params: any
): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        let res = null;
        if (!isExport) {
            res = await gradeService.exportFile(classId, exportType, params);
        } else {
            res = await gradeService.exportGradeBoard(classId, exportType, params);
        }
        saveAs(res?.data, "export.xlsx");
        return {
            statusCode: 200,
            message: "Export file successfully",
        };
    } catch (error: any) {
        console.log("log check export error", error);
        return {
            statusCode: error.response.data.statusCode,
            message: error.response.data.message,
        };
    }
};

export const updateGradeBoard = async (classId: string, params: any): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.updateGradeBoard(classId, params);
        return {
            statusCode: res?.data.statusCode,
            message: res?.data.message,
        };
    } catch (error: any) {
        console.log("log check export error", error);
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message,
        };
    }
};

export const setFinalGrade = async (classId: string, params: any): Promise<MessageInfo> => {
    if (!classId) {
        return errorMessage;
    }

    try {
        const res = await gradeService.setFinalGrade(classId, params);
        return {
            statusCode: res?.data.statusCode,
            message: "Set final grade successfully",
        };
    } catch (error: any) {
        console.log("log check export error", error);
        return {
            statusCode: error.response?.data.statusCode,
            message: error.response?.data.message,
        };
    }
};

export const getGradesView = async (classId: string) => {
    if (!classId) {
        return;
    }
    try {
        const res = await gradeService.getGradesView(classId);
        console.log("log check res", res?.data);
        return res?.data;
    } catch (error: any) {
        return error.response.data;
    }
};
