import { createSlice } from "@reduxjs/toolkit";
import { ClassInfo } from "@src/utils/types";
import { RootState } from "../store";

interface ClassState {
    classList: ClassInfo[];
    currClass: ClassInfo | null;
}

const initialState = {
    classList: [],
    currClass: null,
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

        setCurrClass: (state, action) => {
            state.currClass = action.payload;
        },
    },
});

const { actions, reducer } = classSlice;
export const { setClassList, addClass, setCurrClass } = actions;
export default reducer;

export const selectClassList = (state: RootState) => state.class.classList;
export const selectCurrClass = (state: RootState) => state.class.currClass;
