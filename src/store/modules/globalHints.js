import { UPDATE_SEARCH_GLOBAL, SET_SEARCH_GLOBAL } from '../mutation-types';

const state = {
  updatingSearchGlobal: null,
  enteredSearchGlobal: '',
  hints: [
    {
      pin: 'gaming',
      badges: ['game', 'gamer', 'games', 'computer'],
    },
    {
      pin: 'programming',
      badges: ['programmer', 'code', 'coder', 'javascript', 'computer', 'vue', 'python'],
    },
  ]
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
