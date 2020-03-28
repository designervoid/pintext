import { SET_SEARCH_DROPDOWN_STATE } from '../mutation-types';

const state = {
  searchDropdownTitle: 'Все пинтексты',
  searchDropdownItems: [
    { title: 'Все пинтексты' },
    { title: 'Ваши пинтексты' },
    { title: 'Сохраненные пинтексты' },
  ]
}

const getters = {

}

const actions = {
  changeSearchTextDropdown({ state, commit }, payload) {
    let title = payload.title;
    commit(SET_SEARCH_DROPDOWN_STATE, title);
  }
}

const mutations = {
  [SET_SEARCH_DROPDOWN_STATE](state, payload) {
    state.searchDropdownTitle = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
