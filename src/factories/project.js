const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/project/create"

export const getAllApi = BASE_URL + "/project/get-all"

export const getProjectByIdApi = (projectId) => {
    return BASE_URL + `/project/${projectId}`
}

export const getActiveSprintApi = (projectId) => {
    return BASE_URL + `/project/active-sprint/${projectId}`
}

export const deleteApi = (projectId) => {
    return BASE_URL + `/project/delete/${projectId}`
}

export const removePeopleApi = BASE_URL + "/project/update/remove-people"

export const PROJECT_API = {
    createApi,
    getAllApi,
    getProjectByIdApi,
    getActiveSprintApi,
    deleteApi,
    removePeopleApi
}