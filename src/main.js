import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import  './plugins/base'
import  './plugins/section'
import  './plugins/userCore'
import  './plugins/adminCore'
import  './plugins/health'
import AnimateCSS from 'animate.css';
Vue.config.productionTip = false
Vue.use(AnimateCSS);
new Vue({
  store,
  router,
  vuetify,  
  render: h => h(App)
}).$mount('#app')
