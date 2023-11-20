export const LocalStorage = (function () {
    function _setToken(accessToken: string) {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    }

    function _getAccessToken() {
        return localStorage.getItem("accessToken");
    }

    function _setRefreshToken(refreshToken: string) {
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
    }

    function _getRefreshToken() {
        return localStorage.getItem("refreshToken");
    }

    function _setUserId(userId: string) {
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    }

    function _getUserId() {
        return localStorage.getItem("userId");
    }

    function _clearToken() {
        localStorage.clear();
    }

    return {
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        setRefreshToken: _setRefreshToken,
        setUserId: _setUserId,
        getUserId: _getUserId,
        clearToken: _clearToken,
    };
})();
