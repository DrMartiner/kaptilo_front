import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'

Vue.use(require('vue-moment'));

import axios from 'axios'
import VueAxiosPlugin from 'vue-axios-plugin'
import router from './router'

axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.baseURL = `${process.env.VUE_APP_BASE_API_URL}/api/v1`
axios.interceptors.request.use((config) => {
  if (!config.url.endsWith('/'))
    config.url += '/'

  return config
}, (error) => {
  return Promise.reject(error)
});
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken)
    config.headers.common['Authorization'] = `Token ${accessToken}`

  return config
}, (error) => {
  return Promise.reject(error)
});

axios.interceptors.response.use((request) => {
  return request
}, (error) => {
  if (error.toString().indexOf("Request failed with status code 403") > 0) {
    router.push({'name': 'Auth'})
    localStorage.removeItem("accessToken")
  }

  return Promise.reject(error)
});
Vue.prototype.$axios = axios;

Vue.use(VueAxiosPlugin, {})

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

import Notifications from 'vue-notification'

Vue.use(Notifications)

import App from './App.vue'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
