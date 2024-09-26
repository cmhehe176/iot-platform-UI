import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import LoginPage from './pages/LoginPage.vue'
import Dashboard from './pages/Application/Dashboard.vue'
import AppLayout from './layouts/AppLayout.vue'
import { useAuthStore } from './stores/auth'
import { useAuth } from './composables/useAuth'
import Project from './pages/Application/Project.vue'
import Device from './pages/Application/Device.vue'

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
    component: Dashboard,
    meta: { layout: AppLayout }
  },
  {
    path: '/project',
    name: 'project',
    component: Project,
    meta: { layout: AppLayout }
  },
  {
    path: '/device',
    name: 'device',
    component: Device,
    meta: { layout: AppLayout }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const PUBLIC_PAGES = ['/login', '/']

router.beforeEach(async (to, _from, next) => {
  if (PUBLIC_PAGES.includes(to.path)) {
    return next()
  }

  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return next('/login')
  }

  if (!useAuthStore().user) {
    const { getProfile } = useAuth()
    await getProfile()
  }

  next()
})

export default router
