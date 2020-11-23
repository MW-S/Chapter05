import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import List from '../views/List.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
