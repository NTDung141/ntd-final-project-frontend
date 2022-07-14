const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/subtask/create"

export const SUBTASK_API = {
    createApi,
}