import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import "./assets/static/css/icon.css"
import "./assets/static/css/normal.css"
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import mixin from './mixin/getTime'

//bootstrap用到了rem  可以直接使用

import "./assets/static/css/icon.css"

import store from './store'


Vue.config.productionTip = false
//全局混入
Vue.mixin(mixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
