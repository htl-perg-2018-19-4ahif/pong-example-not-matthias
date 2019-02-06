import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import Vuetify from 'vuetify';
import io from 'socket.io-client';

// Setup the socket (and add it as instance property)
const socket = io('http://localhost:5555');
Vue.prototype.$socket = socket;

// Stylesheets
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

// Import the plugins
Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
