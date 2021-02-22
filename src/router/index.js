import { createRouter, createWebHistory } from 'vue-router'

//views
import PageNotFound from '../views/viewPageNotFound.vue'
import Start from '../views/viewStart.vue'
import Show from '../views/viewShow.vue'
import Movie from '../views/viewMovie.vue'
import About from '../views/viewAbout.vue'
import Credits from '../views/viewCredits.vue'

const routes = [
  //page not found
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: PageNotFound
  },
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
  },
  //about
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  //credits
  {
    path: '/credits',
    name: 'credits',
    component: Credits,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
