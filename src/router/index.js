import { createRouter, createWebHistory } from 'vue-router'

//views
import Start from '../views/viewStart.vue'
import Show from '../views/viewShow.vue'
import Movie from '../views/viewMovie.vue'

const routes = [
  //start
  { 
    path: '/',
    name: 'start',
    component: Start,
  },
  //movie
  {
    path: '/movie/:movieId',
    name: 'movie',
    component: Movie,
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
