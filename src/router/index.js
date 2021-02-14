import { createRouter, createWebHistory } from 'vue-router'

//views
import Start from '../views/viewStart.vue'
import Show from '../views/viewShow.vue'

const routes = [
  //start
  { 
    path: '/',
    name: 'start',
    component: Start,
  },
  //show
  {
    path: '/show/:showId',
    name: 'show',
    component: Show,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
