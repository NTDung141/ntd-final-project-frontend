import Vue from "vue";
import VueRouter from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
import LoginPage from '../views/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/login", component: LoginPage },
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})