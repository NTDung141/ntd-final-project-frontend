import Vue from "vue";
import VueRouter from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ProjectDetailPage from '../views/ProjectDetailPage.vue'
import ProjectPage from '../views/ProjectPage.vue'
import Cookies from "js-cookie";
import ProjectBacklog from '../components/ProjectBacklog.vue'
import ProjectBoard from "@/components/ProjectBoard.vue"
import ProjectGoal from "@/components/ProjectGoal.vue"
import ProjectReview from "@/components/ProjectReview.vue"
import ProjectRetrospective from "@/components/ProjectRetrospective"
import UserProfilePage from "@/views/UserProfilePage.vue"
import AdminUserManagement from "@/components/AdminUserManagement.vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import UserLayout from "@/layouts/UserLayout.vue"

Vue.use(VueRouter)

function beforeEnter(to, from, next) {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  if (userInfo && userInfo.is_admin == 0) {
    next()
  }
  else {
    next('/login')
  }
}

function beforeEnterAdmin(to, from, next) {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  if (userInfo && userInfo.is_admin == 1) {
    next()
  }
  else {
    next('/login')
  }
}

const routes = [
  {
    path: "/",
    component: UserLayout,
    children: [
      { path: "", component: HelloWorld },
      { path: "my-project", component: ProjectsPage, beforeEnter: beforeEnter },
      {
        path: "my-project/:id",
        component: ProjectPage,
        children: [
          { path: "", component: ProjectBoard },
          { path: "backlog", component: ProjectBacklog },
          { path: "goal", component: ProjectGoal },
          { path: "review", component: ProjectReview },
          { path: "retrospective", component: ProjectRetrospective },
        ],
        beforeEnter: beforeEnter
      },
      { path: "/my-project/settings/:id", component: ProjectDetailPage, beforeEnter: beforeEnter },
      { path: "/my-profile", component: UserProfilePage, beforeEnter: beforeEnter },
    ]
  },

  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },

  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", component: AdminUserManagement }
    ], beforeEnter: beforeEnterAdmin
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})