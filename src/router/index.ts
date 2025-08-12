import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ThankYou from '../components/ThankYou.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/obrigado',
    name: 'ThankYou',
    component: ThankYou
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router