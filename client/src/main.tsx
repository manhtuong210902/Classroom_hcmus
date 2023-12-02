import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/mulish";
import "@src/styles/index.scss";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <ToastContainer position="bottom-right" autoClose={2000} />
        </Provider>
    </React.StrictMode>
);
