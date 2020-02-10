import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '../commons/Auth.js';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth
  },
  state: {
    sex: [
      { text: 'Seleccione uno...', value: null },
      'Hombre',
      'Mujer',
      'Indefinido',
    ],
    departments: [
      { text: 'Seleccione uno...', value: null },
      'Antioquia',
      'Cundinamarca',
      'Otro',
    ]
  },
  mutations: {
  },
  actions: {
  },
})
