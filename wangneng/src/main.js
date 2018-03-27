// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import './assets/reset.less';
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    loading:require("@/assets/images/default.png")
})

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // components: { App },
  // template: '<App/>',
});
