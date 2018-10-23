import Vue from 'vue'
import App from './App.vue'

Vue.prototype.moment = require('moment');

new Vue({
  el: '#app',
  render: h => h(App)
})
