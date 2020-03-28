import searchGlobal from '@/store/modules/searchGlobal';
import { SET_SEARCH_DROPDOWN_STATE, UPDATE_SEARCH_GLOBAL, SET_SEARCH_GLOBAL } from '../mutation-types';

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
    commit(`searchGlobal/${UPDATE_SEARCH_GLOBAL}`, null);
    commit(`searchGlobal/${SET_SEARCH_GLOBAL}`, '');
  }
}

const mutations = {
  [SET_SEARCH_DROPDOWN_STATE](state, payload) {
    state.searchDropdownTitle = payload;
  }
}

const modules = {
  searchGlobal
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules
}
