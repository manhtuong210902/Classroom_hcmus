import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import classSlice from "./reducers/classSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        class: classSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
