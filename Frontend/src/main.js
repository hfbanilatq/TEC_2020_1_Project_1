import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import vueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(vueAxios, axios);
axios.defaults.baseURL = 'https://localhost:3000/api';

const token = localStorage.getItem('token');

if(token){
  axios.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
