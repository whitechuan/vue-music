import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import globalcss from './assets/css/global.css'
import {UrlSearch} from './assets/js/getURL'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false

Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios
Vue.prototype.$Request = Request;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
