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
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
