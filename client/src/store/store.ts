import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import classSlice from "./reducers/classSlice";
import gradeSlice from "./reducers/gradeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        class: classSlice,
        grade: gradeSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
