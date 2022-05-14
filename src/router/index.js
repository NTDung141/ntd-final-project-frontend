import Vue from "vue";
import VueRouter from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ProjectDetailPage from '../views/ProjectDetailPage.vue'
import ProjectPage from '../views/ProjectPage.vue'
import Cookies from "js-cookie";

Vue.use(VueRouter)

function beforeEnter(to, from, next) {
  const userInfo = Cookies.get("userInfo");
  if (userInfo) {
    next()
  }
  else {
    next('/login')
  }
}

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/my-project", component: ProjectsPage, beforeEnter: beforeEnter },
  { path: "/my-project/:id", component: ProjectPage, beforeEnter: beforeEnter },
  { path: "/my-project/details/:id", component: ProjectDetailPage, beforeEnter: beforeEnter }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})