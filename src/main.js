import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSkeletonLoader from 'skeleton-loader-vue';

Vue.config.productionTip = false
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

axios.defaults.baseURL = 'http://localhost:8000/api';

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      if (from.name === 'home') {
        router.back();
      }else{
        next({
          name: 'home',
        })
      }
    } else {
      next()
    }
  }else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
