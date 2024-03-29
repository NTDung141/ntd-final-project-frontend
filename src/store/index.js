import Vue from 'vue'
import Vuex from 'vuex'
import AUTHENTICATION_STORE from "./modules/authentication/authentication-store.js"
import PROJECT_STORE from "./modules/project/project-store.js"
import SIDEBAR_STORE from "./modules/sidebar/sidebar-store.js"
import REALTIMECOMMENT_STORE from "./modules/realtimeComment/realtimeComment-store.js"
import SUBTASK_STORE from "./modules/subtask/subtask-store.js"
import NOTIFICATION_STORE from "./modules/notification/notification-store.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AUTHENTICATION_STORE,
        PROJECT_STORE,
        SIDEBAR_STORE,
        REALTIMECOMMENT_STORE,
        SUBTASK_STORE,
        NOTIFICATION_STORE
    }
})