import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/UserPages/Landing'
import About from '../views/UserPages/about'
import Contact from '../views/UserPages/contactUs'
import Health from '../views/Health/HealthLanding'
import HealthSmallScreen from '../views/Health/HealthSmallScreenPremium.vue'
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
  {
    path: '/health',
    name: 'Health',
    component: Health
  },
  {
    path: '/insuranceCover',
    name: 'InsuranceCover',
    component: Health
  },
  {
    path: '/healthPremiumsMobileView',
    name: 'HealthSmallScreen',
    component: HealthSmallScreen
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
