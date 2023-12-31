import { createSlice } from "@reduxjs/toolkit";
import { GradeComposition } from "@src/utils/types";
import { RootState } from "../store";

interface GradeState {
    gradeCompositionList: GradeComposition[];
}

const initialState = {
    gradeCompositionList: [],
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
export const { setGradeCompositionList, addGradeComposition, updateGrade, deleteGrade } = actions;
export default reducer;

export const selectGradeCompositionList = (state: RootState) => state.grade.gradeCompositionList;