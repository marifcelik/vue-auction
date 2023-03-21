import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RouterView,
      children: [
        { path: '', name: 'index', component: HelloWorld },
        { path: 'about', name: 'about', component: About },
        { path: 'contact', name: 'contact', component: Contact },
      ]
    }
  ]
})

export default router