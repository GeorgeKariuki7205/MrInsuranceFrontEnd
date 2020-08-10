import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/UserPages/Landing'
import About from '../views/UserPages/about'
import Contact from '../views/UserPages/contactUs'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact-us',
    name: 'Contact',
    component: Contact
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
