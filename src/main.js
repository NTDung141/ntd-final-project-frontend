import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import { store } from './store/index.js'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

Vue.use(VueToast, {
  position: 'top-right',
  duration: '1500'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
