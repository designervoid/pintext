import {
  REFRESH_RECOMENDATION_PINS_USER,
  SET_RECOMENDATION_PINS_USER,
  REFRESH_RECOMENDATION_HINTS_USER,
  SET_RECOMENDATION_HINTS_USER
} from '../mutation-types';

const state = {
  hintsObjectUser: [{
      id: 4,
      pin: 'another_gaming',
      counter: 0,
      title: 'another some title about gaming',
      text: 'some text here about gaming',
      badges: ['another_game', 'gamer', 'games', 'computer'],
    },
    {
      id: 5,
      pin: 'another_programming',
      counter: 0,
      title: 'some title about prograaming',
      text: 'some text here about prograaming',
      badges: ['programmer', 'code', 'coder', 'javascript', 'computer', 'vue', 'python'],
    },
    {
      id: 6,
      pin: 'another_computers',
      counter: 0,
      title: 'some title about computers',
      text: 'some text here about computers',
      badges: ['computer', 'network'],
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
    if (state.recommendedPinsUser.length === 0) {
      commit(REFRESH_RECOMENDATION_PINS_USER, [...getters.pinsListUser]);
      dispatch('pushRecomendedHintsUser');
    }
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
