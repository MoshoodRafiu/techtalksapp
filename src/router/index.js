import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ChatBox from '../views/ChatBox'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatBox,
    meta: { requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
