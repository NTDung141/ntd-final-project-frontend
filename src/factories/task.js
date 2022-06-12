const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/task/create"

export const updateApi = BASE_URL + "/task/update"

export const TASK_API = {
    createApi,
    updateApi
}