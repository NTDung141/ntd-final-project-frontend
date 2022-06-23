const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/task/create"

export const updateApi = BASE_URL + "/task/update"

export const deleteApi = (id) => {
    return BASE_URL + `/task/delete/${id}`
}

export const getByIdApi = (id) => {
    return BASE_URL + `/task/${id}`
}

export const TASK_API = {
    createApi,
    updateApi,
    deleteApi,
    getByIdApi
}