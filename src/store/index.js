import Vue from 'vue'
import Vuex from 'vuex'
import AUTHENTICATION_STORE from "./modules/authentication/authentication-store.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        AUTHENTICATION_STORE
    }
})