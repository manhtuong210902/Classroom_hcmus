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

    function _setRedirectUrl(url: string) {
        if (url) {
            localStorage.setItem("redirectUrl", url);
        }
    }

    function _getRedirectUrl() {
        return localStorage.getItem("redirectUrl");
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
        setRedirectUrl: _setRedirectUrl,
        getRedirectUrl: _getRedirectUrl,
    };
})();
