import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "@src/utils/types";
import { RootState } from "../store";

interface AuthState {
    isAuthenticated: boolean;
    user: UserInfo | null;
}

const initialState = {
    isAuthenticated: false,
    user: null,
} as AuthState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUserSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail: (state) => {
            state.isAuthenticated = false;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

const { actions, reducer } = authSlice;
export const { loadUserSuccess, loadUserFail, updateUser } = actions;
export default reducer;

export const selectUserInfo = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
