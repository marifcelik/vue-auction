import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import About from './components/About.vue'
import { RouterView } from 'vue-router'

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
      ]
    }
  ]
})

export default router