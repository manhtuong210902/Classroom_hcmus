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
};