import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { SERVER } from './config'
import store from './store'
import Logout from './components/Logout.vue'
import HelloWorld from './views/HelloWorld.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Products from './views/Products.vue'
import NotFound from './views/404.vue'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: RouterView,
      children: [
        { path: '', name: 'index', component: HelloWorld },
        { path: 'login', name: 'login', component: Login },
        { path: 'logout', name: 'logout', component: Logout },
        { path: 'register', name: 'register', component: Register }
      ]
    },
    {
      path: '/products',
      meta: { requireAuth: true },
      component: RouterView,
      children: [
        { path: '', name: 'products', component: Products },
        { path: ':id', name: 'product', component: () => import('./views/Product.vue'), props: true }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (store.userId) {
    const check = await fetch(`${SERVER}/auth/check`, {
      credentials: 'include'
    })
    if (!check.ok)
      store.userId = undefined
  }

  if (to.meta.requireAuth && !store.userId) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }
})
export default router
