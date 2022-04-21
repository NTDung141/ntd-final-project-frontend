import Vue from "vue";
import VueRouter from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/my-project", component: ProjectsPage }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})