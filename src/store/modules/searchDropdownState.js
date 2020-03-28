import searchGlobal from '@/store/modules/searchGlobal';
import hintsGlobal from './hintsGlobal';
import hintsUser from './hintsUser';
import hintsUserSaved from './hintsUserSaved';
import { SET_SEARCH_DROPDOWN_TITLE, UPDATE_SEARCH_GLOBAL, SET_SEARCH_GLOBAL } from '../mutation-types';

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

    if (state.searchDropdownTitle === 'Все пинтексты') {
        dispatch('hintsGlobal/manualUpdateGettersGlobal');
    }

    if (state.searchDropdownTitle === 'Ваши пинтексты') {
        dispatch('hintsUser/manualUpdateGettersUser');
    }

    if (state.searchDropdownTitle === 'Сохраненные пинтексты') {
        dispatch('hintsUserSaved/manualUpdateGettersUserSaved');
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
  hintsGlobal,
  hintsUser,
  hintsUserSaved
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules
}
