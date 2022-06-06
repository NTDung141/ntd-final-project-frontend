import Vue from 'vue'
import Vuex from 'vuex'
import AUTHENTICATION_STORE from "./modules/authentication/authentication-store.js"
import PROJECT_STORE from "./modules/project/project-store.js"
import SIDEBAR_STORE from "./modules/sidebar/sidebar-store.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AUTHENTICATION_STORE,
        PROJECT_STORE,
        SIDEBAR_STORE
    }
})