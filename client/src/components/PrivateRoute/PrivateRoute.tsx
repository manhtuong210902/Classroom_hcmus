import routes from "@src/configs/router";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { loaderUser } from "@src/services/auth/apiRequest";
import { selectIsAuthenticated } from "@src/store/reducers/authSlice";
import { LocalStorage } from "@src/utils/LocalStorage";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const userId = LocalStorage.getUserId();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        loaderUser(dispatch);
    }, [userId]);

    return isAuthenticated ? <Outlet /> : <Navigate to={routes.LANDINGPAGE} />;
};

export default PrivateRoute;
