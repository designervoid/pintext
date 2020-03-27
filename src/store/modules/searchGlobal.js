import { UPDATE_SEARCH_GLOBAL, SET_SEARCH_GLOBAL } from '../mutation-types';

const state = {
  updatingSearchGlobal: null,
  enteredSearchGlobal: '',
}

const getters = {

}

const actions = {

}

const mutations = {
    [UPDATE_SEARCH_GLOBAL](state, payload) {
      state.updatingSearchGlobal = payload;
    },
    [SET_SEARCH_GLOBAL](state, payload) {
      state.enteredSearchGlobal = payload;
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
