import { createSlice } from "@reduxjs/toolkit";
import { GradeComposition } from "@src/utils/types";
import { RootState } from "../store";

interface GradeState {
    gradeCompositionList: GradeComposition[];
    gradeStudentList: any[];
    loadingStudentList: boolean;
}

const initialState = {
    gradeCompositionList: [],
    gradeStudentList: [],
    loadingStudentList: false,
} as GradeState;

const gradeSlice = createSlice({
    name: "grade",
    initialState,
    reducers: {
        setGradeCompositionList: (state, action) => {
            state.gradeCompositionList = action.payload;
        },

        addGradeComposition: (state, action) => {
            state.gradeCompositionList.push(action.payload);
        },

        setLoadingStudentList: (state, action) => {
            state.loadingStudentList = action.payload;
        },

        setGradeStudentList: (state, action) => {
            state.gradeStudentList = action.payload;
        },

        updateGrade: (state, action) => {
            const { id, name, scale } = action.payload;
            const index = state.gradeCompositionList.findIndex((grade) => grade.id === id);
            if (index !== -1) {
                state.gradeCompositionList[index].name = name;
                state.gradeCompositionList[index].scale = scale;
            }
        },

        deleteGrade: (state, action) => {
            const index = state.gradeCompositionList.findIndex((grade) => grade.id === action.payload);
            if (index !== -1) {
                state.gradeCompositionList.splice(index, 1);
            }
        },
    },
});

const { actions, reducer } = gradeSlice;
export const {
    setGradeCompositionList,
    addGradeComposition,
    updateGrade,
    deleteGrade,
    setGradeStudentList,
    setLoadingStudentList,
} = actions;
export default reducer;

export const selectGradeCompositionList = (state: RootState) => state.grade.gradeCompositionList;
export const selectGradeStudentList = (state: RootState) => state.grade.gradeStudentList;
export const selectLoadingStudentList = (state: RootState) => state.grade.loadingStudentList;
