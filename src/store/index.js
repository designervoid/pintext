import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import searchGlobal from '@/store/modules/searchGlobal';
import hints from '@/store/modules/hints';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    searchGlobal,
    hints
  },
  // plugins: [createPersistedState()]
});
