import { createRouter, createWebHistory } from 'vue-router'

//components
import Home from '../views/home.vue'

const routes = [
  //home
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
