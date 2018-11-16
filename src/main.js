import Vue from 'vue';
import App from './App.vue';

// import VueMoment from 'vue-moment'
import moment from 'moment'
//import 'moment/locale/ru'

//moment.locale('ru')

Vue.prototype.moment = moment

new Vue({
  el: '#app',
  render: h => h(App)

});



//Vue.use( moment )

