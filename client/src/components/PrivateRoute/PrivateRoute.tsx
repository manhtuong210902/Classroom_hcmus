import routes from "@src/configs/router";
import { useAppDispatch, useAppSelector } from "@src/hooks/appHook";
import { loaderUser } from "@src/services/auth/apiRequest";
import { selectIsAuthenticated, selectUserInfo } from "@src/store/reducers/authSlice";
import { LocalStorage } from "@src/utils/LocalStorage";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(selectUserInfo);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = LocalStorage.getAccessToken();
        if (!user) {
            loaderUser(dispatch);
        }

        if (!accessToken) {
            navigate(routes.LANDINGPAGE);
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : null;
};

export default PrivateRoute;
