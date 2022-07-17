const BASE_URL = process.env.VUE_APP_BASE_URL

export const getByAuthApi = BASE_URL + "/notification/get-by-auth"

export const NOTIFICATION_API = {
    getByAuthApi,
}