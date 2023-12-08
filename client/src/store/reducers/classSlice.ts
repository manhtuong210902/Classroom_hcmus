import { createSlice } from "@reduxjs/toolkit";
import { ClassInfo } from "@src/utils/types";
import { RootState } from "../store";

interface ClassState {
    classList: ClassInfo[];
}

const initialState = {
    classList: [],
} as ClassState;

const classSlice = createSlice({
    name: "class",
    initialState,
    reducers: {
        setClassList: (state, action) => {
            state.classList = action.payload;
        },

        addClass: (state, action) => {
            state.classList.push(action.payload);
        },
    },
});

const { actions, reducer } = classSlice;
export const { setClassList, addClass } = actions;
export default reducer;

export const selectClassList = (state: RootState) => state.class.classList;
