import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");

const authHeader = {
    Authorization: `Bearer ${accessToken}`,
};

export const CookieService = {
    authHeader
}