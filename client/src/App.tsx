import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import "./App.css";
import React from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
    return (
        <>
            <Router>
                <div>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route?.layout || React.Fragment;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        <Route element={<PrivateRoute />}>
                            {privateRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route?.layout || React.Fragment;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
