import Cookies from "js-cookie";

let authHeader = () => {
    let accessToken = Cookies.get("accessToken");
    return { Authorization: `Bearer ${accessToken}` }
};

export const CookieService = {
    authHeader
}