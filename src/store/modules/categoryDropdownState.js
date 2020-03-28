import hintsGlobal from './hintsGlobal';
import hintsUser from './hintsUser';
import hintsUserSaved from './hintsUserSaved';
import { SET_CATEGORY_DROPDOWN_TITLE } from '../mutation-types';

const state = {
  categoryDropdownTitle: 'Выберите пин (категория)',
}

const getters = {

}

const actions = {
  changeCategoryTextDropdown({ rootState, commit, dispatch }, payload) {
    let title = payload.title;
    commit(SET_CATEGORY_DROPDOWN_TITLE, title);

    let searchDropdownTitle = rootState.searchDropdownState.searchDropdownTitle;
    if (searchDropdownTitle === 'Все пинтексты') {
        dispatch('hintsGlobal/filterByPinGlobal', { pin: title });
    }

    if (searchDropdownTitle === 'Ваши пинтексты') {
      dispatch('hintsUser/filterByPinUser', { pin: title });
    }

    if (searchDropdownTitle === 'Сохраненные пинтексты') {
      dispatch('hintsUserSaved/filterByPinUserSaved', { pin: title });
    }
  }
}

const mutations = {
  [SET_CATEGORY_DROPDOWN_TITLE](state, payload) {
    state.categoryDropdownTitle = payload;
  }
}

const modules = {
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
