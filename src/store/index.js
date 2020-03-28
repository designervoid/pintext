import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import searchDropdownState from '@/store/modules/searchDropdownState';
import searchGlobal from '@/store/modules/searchGlobal';
import hintsGlobal from '@/store/modules/hintsGlobal';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    searchDropdownState,
    searchGlobal,
    hintsGlobal
  },
  // plugins: [createPersistedState()]
});
