import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import LoginPage from './pages/LoginPage.vue'
import DashboardPage from './pages/Application/DashboardPage.vue'
import AppLayout from './layouts/AppLayout.vue'
import { useAuthStore } from './stores/auth'
import { useAuth } from './composables/useAuth'

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
    component: DashboardPage,
    meta: { layout: AppLayout }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const PUBLIC_PAGES = ['/login', '/']

router.beforeEach(async (to, from, next) => {
  if (PUBLIC_PAGES.includes(to.path)) {
    return next()
  }

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return next('/login')
  }

  const auth = useAuthStore()

  if (!auth.user) {
    const { getProfile } = useAuth()
    await getProfile()
  }

  next()
})

export default router
