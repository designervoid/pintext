import {
  REFRESH_RECOMENDATION_PINS_USER_SAVED,
  SET_RECOMENDATION_PINS_USER_SAVED,
  REFRESH_RECOMENDATION_HINTS_USER_SAVED,
  SET_RECOMENDATION_HINTS_USER_SAVED
} from '../mutation-types';

const state = {
  hintsObjectUserSaved: [{
      id: 4,
      pin: 'user_saved_gaming',
      counter: 0,
      title: 'another some title about gaming',
      text: 'some text here about gaming',
      badges: ['user_saved_another_game', 'user_saved_gamer', 'user_saved_games', 'user_saved_computer'],
    },
    {
      id: 5,
      pin: 'user_saved_programming',
      counter: 0,
      title: 'some title about prograaming',
      text: 'some text here about prograaming',
      badges: ['user_saved_programmer', 'user_saved_code', 'user_saved_coder', 'user_saved_javascript', 'user_saved_computer', 'user_saved_vue', 'user_saved_python'],
    },
    {
      id: 6,
      pin: 'user_saved_computers',
      counter: 0,
      title: 'some title about computers',
      text: 'some text here about computers',
      badges: ['user_saved_computer', 'user_saved_network'],
    },
  ],
  recommendedPinsUserSaved: [],
  recommendedHintsUserSaved: []
}

const getters = {
  pinsListUserSaved: state => {
    let arr = [];
    for (let element in state.hintsObjectUserSaved) {
      let hint = state.hintsObjectUserSaved[element];
      arr.push(hint.pin);
    }
    return arr
  },
  hintsListUserSaved: state => {
    let arr = [];
    for (let element in state.hintsObjectUserSaved) {
      let hint = state.hintsObjectUserSaved[element];
      arr.push(hint.badges);
    }
    let merged = arr.flat(1);
    return merged
  },
}

const actions = {
  manualUpdateGettersUserSaved({
    state,
    commit,
    getters,
    dispatch
  }) {
    if (state.recommendedPinsUserSaved.length === 0) {
      commit(REFRESH_RECOMENDATION_PINS_USER_SAVED, [...getters.pinsListUserSaved]);
      dispatch('pushRecomendedHintsUserSaved');
    }
  },
  findElementInHintsObjectUserSaved({
    state,
    commit,
    getters
  }, payload) {
    let enteredSearch = payload.enteredSearch;
    commit(REFRESH_RECOMENDATION_PINS_USER_SAVED, []);
    for (let element in state.hintsObjectUserSaved) {
      let hint = state.hintsObjectUserSaved[element];

      if (hint.badges.indexOf(enteredSearch) !== -1) {
        hint.counter += 1;
        commit(SET_RECOMENDATION_PINS_USER_SAVED, hint.pin)
      }
    }
  },
  iterateRecomendedPinsUserSaved({
    state,
    commit
  }, payload) {
    let pin = payload.pin;
    for (let element in state.hintsObjectUserSaved) {
      let hint = state.hintsObjectUserSaved[element];
      if (hint.pin === pin) {
        commit(SET_RECOMENDATION_HINTS_USER_SAVED, hint);
      }
    }
  },
  pushRecomendedHintsUserSaved({
    state,
    dispatch,
    commit
  }) {
    commit(REFRESH_RECOMENDATION_HINTS_USER_SAVED, []);
    let pins = state.recommendedPinsUserSaved;
    for (let element in pins) {
      let pin = pins[element];
      dispatch('iterateRecomendedPinsUserSaved', {
        pin: pin
      })
    }
  },
  filterByPinUserSaved({
    commit,
    dispatch
  }, payload) {
    let pin = payload.pin;
    commit(REFRESH_RECOMENDATION_HINTS_USER_SAVED, []);
    dispatch('iterateRecomendedPinsUserSaved', {
      pin: pin
    })
  }
}

const mutations = {
  [REFRESH_RECOMENDATION_PINS_USER_SAVED](state, payload) {
    state.recommendedPinsUserSaved = payload;
  },
  [SET_RECOMENDATION_PINS_USER_SAVED](state, payload) {
    state.recommendedPinsUserSaved.push(payload);
  },
  [REFRESH_RECOMENDATION_HINTS_USER_SAVED](state, payload) {
    state.recommendedHintsUserSaved = payload;
  },
  [SET_RECOMENDATION_HINTS_USER_SAVED](state, payload) {
    state.recommendedHintsUserSaved.push(payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
