import routes from "@src/configs/router";
import { LocalStorage } from "@src/utils/LocalStorage";
import { useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const LoginSuccess = () => {
    const [searchParams] = useSearchParams();
    const [isSuccess, setIsSccess] = useState(true);

    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const userId = searchParams.get("user_id");
    const redirectUrl = LocalStorage.getRedirectUrl();

    if (!accessToken || !refreshToken || !userId) {
        setIsSccess(false);
    } else {
        LocalStorage.setToken(accessToken);
        LocalStorage.setRefreshToken(refreshToken);
        LocalStorage.setUserId(userId);
    }

    if (!isSuccess) {
        return <Navigate to={routes.LOGIN} />;
    }

    return <Navigate to={redirectUrl || routes.HOME} />;
};

export default LoginSuccess;
