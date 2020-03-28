import searchGlobal from '@/store/modules/searchGlobal';
import categoryDropdownState from './categoryDropdownState'
import { SET_SEARCH_DROPDOWN_TITLE, UPDATE_SEARCH_GLOBAL, SET_SEARCH_GLOBAL, SET_CATEGORY_DROPDOWN_TITLE } from '../mutation-types';

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
  changeSearchTextDropdown({ state, commit, dispatch }, payload) {
    let title = payload.title;
    commit(SET_SEARCH_DROPDOWN_TITLE, title);
    commit(`searchGlobal/${UPDATE_SEARCH_GLOBAL}`, null);
    commit(`searchGlobal/${SET_SEARCH_GLOBAL}`, '');
    commit(`categoryDropdownState/${SET_CATEGORY_DROPDOWN_TITLE}`, 'Выберите пин (категория)');

    if (state.searchDropdownTitle === 'Все пинтексты') {
        dispatch('categoryDropdownState/hintsGlobal/manualUpdateGettersGlobal');
    }

    if (state.searchDropdownTitle === 'Ваши пинтексты') {
        dispatch('categoryDropdownState/hintsUser/manualUpdateGettersUser');
    }

    if (state.searchDropdownTitle === 'Сохраненные пинтексты') {
        dispatch('categoryDropdownState/hintsUserSaved/manualUpdateGettersUserSaved');
    }
  }
}

const mutations = {
  [SET_SEARCH_DROPDOWN_TITLE](state, payload) {
    state.searchDropdownTitle = payload;
  }
}

const modules = {
  searchGlobal,
  categoryDropdownState
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules
}
