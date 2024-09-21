import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import LoginPage from './pages/LoginPage.vue'
import Dashboard from './pages/Application/Dashboard.vue'

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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
