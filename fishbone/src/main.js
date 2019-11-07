// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'

Vue.use(ElementUI);
Vue.prototype.$ajax= axios; // 把axios写在Vue的属性上，在其它组件中，通过this.$ajax来使用axios
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
