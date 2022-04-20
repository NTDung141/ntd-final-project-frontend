const BASE_URL = process.env.VUE_APP_BASE_URL

export const loginApi = BASE_URL + "/auth/login"

export const logoutApi = BASE_URL + "/auth/logout"

export const registerApi = BASE_URL + "/auth/register"

export const getUserProfileApi = BASE_URL + "/auth/user-profile"

export const AUTH_API = {
    loginApi,
    logoutApi,
    registerApi,
    getUserProfileApi
}