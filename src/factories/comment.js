const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/comment/create"

export const deleteApi = (id) => {
    return BASE_URL + `/comment/delete/${id}`
}

export const COMMENT_API = {
    createApi,
    deleteApi
}