import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Plugins
import Vuetify from 'vuetify';

// Stylesheets
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
