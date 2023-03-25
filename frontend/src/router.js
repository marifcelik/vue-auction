import { createRouter, createWebHistory, RouterView } from 'vue-router'
import store from './store'
import HelloWorld from './views/HelloWorld.vue'
import Login from './views/Login.vue'
import Logout from './components/Logout.vue'
import Register from './views/Register.vue'
import Contact from './views/Contact.vue'
import Products from './views/Products.vue'

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
        { path: 'contact', name: 'contact', component: Contact },
        { path: 'register', name: 'register', component: Register }
      ]
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: { requireAuth: true }
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.requireAuth && !store.isLoggedIn) {
    return {
      name: 'login',
      query: { redirect: to.name }
    }
  }
})

export default router
