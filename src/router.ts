import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import LoginPage from './pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
