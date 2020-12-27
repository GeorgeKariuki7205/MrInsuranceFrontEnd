import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/UserPages/Landing";
import About from "../views/UserPages/about";
import Contact from "../views/UserPages/contactUs";
import Insurance from "../views/insurance/insuranceLanding";
import InsuranceSmallScreen from "../views/insurance/insuranceSmallScreenPremium.vue";
import Login from "../views/UserPages/login.vue";
import ActivatingAccount from "../views/UserPages/activatingAccount.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact-us",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/activatingAccount/:uuid",
    name: "ActivatingAccount",
    component: ActivatingAccount,
    props: true,
  },
  {
    path: "/health",
    name: "Insurance",
    component: Insurance,
  },
  {
    path: "/insuranceCover",
    name: "InsuranceCover",
    component: Insurance,
  },
  {
    path: "/insurancePremiumsMobileView",
    name: "InsuranceSmallScreen",
    component: InsuranceSmallScreen,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
