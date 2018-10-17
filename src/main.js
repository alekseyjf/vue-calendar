import Vue from 'vue';
import App from './App.vue';

// import VueMoment from 'vue-moment'
import moment from 'moment'

Vue.prototype.moment = moment

new Vue({
  el: '#app',
  render: h => h(App)

});



//Vue.use( moment )

