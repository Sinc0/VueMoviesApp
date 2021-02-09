import { createRouter, createWebHistory } from 'vue-router'

//components
import Start from '../views/viewStart.vue'
import Show from '../views/viewShow.vue'
import Asdf from '../views/viewAsdf.vue'

const routes = [
  //start
  { 
    path: '/',
    name: 'start',
    component: Start,
  },
  //show
  {
    path: '/show',
    name: 'show',
    component: Show,
  },
  //asdf
  {
    path: '/asdf',
    name: 'asdf',
    component: Asdf,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
