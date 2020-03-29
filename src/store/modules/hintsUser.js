import {
  REFRESH_RECOMENDATION_PINS_USER,
  SET_RECOMENDATION_PINS_USER,
  REFRESH_RECOMENDATION_HINTS_USER,
  SET_RECOMENDATION_HINTS_USER,
  APPEND_HINTS_OBJECT_USER
} from '../mutation-types';

const state = {
  hintsObjectUser: [{
      id: 4,
      pin: 'user_created_gaming',
      counter: 0,
      title: 'user_ another some title about gaming',
      text: 'user_ some text here about gaming',
      badges: ['user_created_another_game', 'user_created_gamer', 'user_created_games', 'user_created_computer'],
    },
    {
      id: 5,
      pin: 'user_created_programming',
      counter: 0,
      title: 'user_ some title about prograaming',
      text: 'user_ some text here about prograaming',
      badges: ['user_created_programmer', 'user_created_code', 'user_created_coder', 'user_created_javascript', 'user_created_computer', 'user_created_vue', 'user_created_python'],
    },
    {
      id: 6,
      pin: 'user_created_computers',
      counter: 0,
      title: 'user_ some title about computers',
      text: 'user_ some text here about computers',
      badges: ['user_created_computer', 'user_created_network'],
    },
  ],
  recommendedPinsUser: [],
  recommendedHintsUser: []
}

const getters = {
  pinsListUser: state => {
    let arr = [];
    for (let element in state.hintsObjectUser) {
      let hint = state.hintsObjectUser[element];
      arr.push(hint.pin);
    }
    return arr
  },
  hintsListUser: state => {
    let arr = [];
    for (let element in state.hintsObjectUser) {
      let hint = state.hintsObjectUser[element];
      arr.push(hint.badges);
    }
    let merged = arr.flat(1);
    return merged
  },
}

const actions = {
  manualUpdateGettersUser({
    state,
    commit,
    getters,
    dispatch
  }) {
    commit(REFRESH_RECOMENDATION_PINS_USER, [...getters.pinsListUser]);
    dispatch('pushRecomendedHintsUser');
  },
  findElementInHintsObjectUser({
    state,
    commit,
    getters
  }, payload) {
    let enteredSearch = payload.enteredSearch;
    commit(REFRESH_RECOMENDATION_PINS_USER, []);
    for (let element in state.hintsObjectUser) {
      let hint = state.hintsObjectUser[element];

      if (hint.badges.indexOf(enteredSearch) !== -1) {
        hint.counter += 1;
        commit(SET_RECOMENDATION_PINS_USER, hint.pin)
      }
    }
  },
  iterateRecomendedPinsUser({
    state,
    commit
  }, payload) {
    let pin = payload.pin;
    for (let element in state.hintsObjectUser) {
      let hint = state.hintsObjectUser[element];
      if (hint.pin === pin) {
        commit(SET_RECOMENDATION_HINTS_USER, hint);
      }
    }
  },
  pushRecomendedHintsUser({
    state,
    dispatch,
    commit
  }) {
    if (state.recommendedPinsUser.length === 0) {
      console.log('not found anything')
    }
    commit(REFRESH_RECOMENDATION_HINTS_USER, []);
    let pins = state.recommendedPinsUser;
    for (let element in pins) {
      let pin = pins[element];
      dispatch('iterateRecomendedPinsUser', {
        pin: pin
      })
    }
  },
  filterByPinUser({
    commit,
    dispatch
  }, payload) {
    let pin = payload.pin;
    commit(REFRESH_RECOMENDATION_HINTS_USER, []);
    dispatch('iterateRecomendedPinsUser', {
      pin: pin
    })
  },
  appendHintsObjectUser({ commit }, payload) {
      let modal = payload.modal;
      commit(APPEND_HINTS_OBJECT_USER, modal);
  }
}

const mutations = {
  [REFRESH_RECOMENDATION_PINS_USER](state, payload) {
    state.recommendedPinsUser = payload;
  },
  [SET_RECOMENDATION_PINS_USER](state, payload) {
    state.recommendedPinsUser.push(payload);
  },
  [REFRESH_RECOMENDATION_HINTS_USER](state, payload) {
    state.recommendedHintsUser = payload;
  },
  [SET_RECOMENDATION_HINTS_USER](state, payload) {
    state.recommendedHintsUser.push(payload);
  },
  [APPEND_HINTS_OBJECT_USER](state, payload) {
    state.hintsObjectUser.push(payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
