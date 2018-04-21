import 'babel-polyfill'  // 对es6的api做转义
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' // 解决3毫秒的延迟
import VueLazyLoad from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'

// Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
