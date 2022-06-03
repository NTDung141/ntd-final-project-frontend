const BASE_URL = process.env.VUE_APP_BASE_URL

export const getActiveSprintApi = (projectId) => {
    return BASE_URL + `/project/active-sprint/${projectId}`
}

export const PROJECT_API = {
    getActiveSprintApi
}