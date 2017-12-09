// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload'
import api from './api'
import infiniteScroll from 'vue-infinite-scroll'
import store from './store'

Vue.use(vueLazyLoad, {
  loading: '/static/images/loading-spin.svg',
})
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.prototype.$ajax = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$store.commit("checkLogin")
  }
})
