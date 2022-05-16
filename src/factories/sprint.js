const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/sprint/create"

export const SPRINT_API = {
    createApi
}