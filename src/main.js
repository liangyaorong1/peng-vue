import Vue from 'vue'
import App from './App.vue'
import api from './http'
import store from './store'
import router from './router'
import global from '@/utils/global'
import qs from 'qs'
import ElementUI from 'element-ui';
import DonMessage from '@/assets/js/components/message'
import datetime from '@/utils/datetime'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(api)
Vue.use(ElementUI)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.$message = DonMessage
Vue.prototype.$global = global
Vue.prototype.$datetime = datetime

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
