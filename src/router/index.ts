import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import UserRegister from '../components/UserRegister.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/user-register',
    name: 'user-register',
    component: UserRegister
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
