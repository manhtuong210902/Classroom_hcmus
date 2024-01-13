import { ExportType } from "@src/utils/enum";
import axiosClient from "../axiosClient";
import { COMPOSITION_API } from "./api";

export const gradeService = {
    createGradeComposition: async (classId: string, params: any) => {
        if (!classId) {
            return;
        }
        return axiosClient.post(`${COMPOSITION_API}/${classId}/management`, params);
    },

    getGradeCompositions: async (classId: string) => {
        if (!classId) {
            return;
        }
        return axiosClient.get(`${COMPOSITION_API}/${classId}/management/list`);
    },

    updateGradeComposition: async (classId: string, compositionId: string, params: any) => {
        if (!classId || !compositionId) {
            return;
        }
        return axiosClient.patch(`${COMPOSITION_API}/${classId}/management/grade/${compositionId}`, params);
    },

    deleteGradeComposition: async (classId: string, compositionId: string) => {
        if (!classId || !compositionId) {
            return;
        }
        return axiosClient.delete(`${COMPOSITION_API}/${classId}/management/grade/${compositionId}`);
    },

    getGradeBoard: async (classId: string) => {
        if (!classId) {
            return;
        }
        return axiosClient.get(`${COMPOSITION_API}/${classId}/management/grade-board`);
    },

    uploadStudentList: async (classId: string, fromData: any) => {
        if (!classId) {
            return;
        }
        return axiosClient.post(`${COMPOSITION_API}/${classId}/file/upload`, fromData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    completeUploadListStudent: async (classId: string, randomString: string, fileType: string) => {
        return axiosClient.post(`${COMPOSITION_API}/${classId}/file/completed`, {
            random: randomString,
            fileType: fileType,
        });
    },

    exportFile: async (classId: string, exportType: ExportType, params: any) => {
        if (!classId) {
            return;
        }
        return axiosClient.get(`${COMPOSITION_API}/${classId}/default-file/${exportType}`, {
            params,
            responseType: "blob",
        });
    },

    exportGradeBoard: async (classId: string, exportType: ExportType, params: any) => {
        if (!classId) {
            return;
        }
        return axiosClient.get(`${COMPOSITION_API}/${classId}/export-file/${exportType}`, {
            params,
            responseType: "blob",
        });
    },

    updateGradeBoard: async (classId: string, params: any) => {
        if (!classId) {
            return;
        }
        return axiosClient.patch(`${COMPOSITION_API}/${classId}/management/grade-board`, params);
    },

    setFinalGrade: async (classId: string, gradeId: string) => {
        if (!classId) {
            return;
        }
        return axiosClient.post(`${COMPOSITION_API}/${classId}/management/grade/${gradeId}/set-final`);
    },

    getGradesView: async (classId: string) => {
        if (!classId) {
            return;
        }
        return axiosClient.get(`${COMPOSITION_API}/${classId}/view-grades`);
    },
};
