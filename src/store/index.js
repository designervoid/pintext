import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import globalHints from '@/store/modules/globalHints'

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    globalHints
  },
  plugins: [createPersistedState()]
});
