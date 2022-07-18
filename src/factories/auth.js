const BASE_URL = process.env.VUE_APP_BASE_URL

export const loginApi = BASE_URL + "/auth/login"

export const logoutApi = BASE_URL + "/auth/logout"

export const registerApi = BASE_URL + "/auth/register"

export const getUserProfileApi = BASE_URL + "/auth/user-profile"

export const getAllUserApi = BASE_URL + "/auth/get-all"

export const blockUserApi = BASE_URL + "/auth/block"

export const unblockUserApi = BASE_URL + "/auth/unblock"

export const AUTH_API = {
    loginApi,
    logoutApi,
    registerApi,
    getUserProfileApi,
    getAllUserApi,
    blockUserApi,
    unblockUserApi
}