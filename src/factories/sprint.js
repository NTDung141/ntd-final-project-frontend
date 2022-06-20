const BASE_URL = process.env.VUE_APP_BASE_URL

export const createApi = BASE_URL + "/sprint/create"

export const startSprintApi = (id) => {
    return BASE_URL + `/sprint/start-sprint/${id}`
}

export const compeleteSprintApi = BASE_URL + `/sprint/complete-sprint`

export const deleteSprintApi = (id) => {
    return BASE_URL + `/sprint/delete/${id}`
}

export const updateApi = BASE_URL + "/sprint/update"

export const SPRINT_API = {
    createApi,
    startSprintApi,
    compeleteSprintApi,
    deleteSprintApi,
    updateApi
}