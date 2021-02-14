import { createRouter, createWebHistory } from 'vue-router'

//components
import Start from '../views/viewStart.vue'
// import Show from '../views/viewShow.vue'
import Show from '../views/viewAsdf.vue'

const routes = [
  //start
  { 
    path: '/',
    name: 'start',
    component: Start,
  },
  //show
  // {
  //   path: '/show',
  //   name: 'show',
  //   component: Show,
  // },
  //asdf
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
