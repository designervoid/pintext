import {
  REFRESH_RECOMENDATION_PINS_GLOBAL,
  SET_RECOMENDATION_PINS_GLOBAL,
  REFRESH_RECOMENDATION_HINTS_GLOBAL,
  SET_RECOMENDATION_HINTS_GLOBAL
} from '../mutation-types';

const state = {
  hintsObjectGlobal: [{
      id: 1,
      pin: 'gaming',
      counter: 0,
      title: 'some title about gaming',
      text: 'some text here about gaming',
      badges: ['game', 'gamer', 'games', 'computer'],
    },
    {
      id: 2,
      pin: 'programming',
      counter: 0,
      title: 'some title about prograaming',
      text: 'some text here about prograaming',
      badges: ['programmer', 'code', 'coder', 'javascript', 'computer', 'vue', 'python'],
    },
    {
      id: 3,
      pin: 'computers',
      counter: 0,
      title: 'some title about computers',
      text: 'some text here about computers',
      badges: ['computer', 'network'],
    },
  ],
  recommendedPinsGlobal: [],
  recommendedHintsGlobal: []
}

const getters = {
  pinsListGlobal: state => {
    let arr = [];
    for (let element in state.hintsObjectGlobal) {
      let hint = state.hintsObjectGlobal[element];
      arr.push(hint.pin);
    }
    return arr
  },
  hintsListGlobal: state => {
    let arr = [];
    for (let element in state.hintsObjectGlobal) {
      let hint = state.hintsObjectGlobal[element];
      arr.push(hint.badges);
    }
    let merged = arr.flat(1);
    return merged
  },
}

const actions = {
  manualUpdateGetters({
    state,
    commit,
    getters,
    dispatch
  }) {
    if (state.recommendedPinsGlobal.length === 0) {
      commit(REFRESH_RECOMENDATION_PINS_GLOBAL, [...getters.pinsListGlobal]);
      dispatch('pushRecomendedHints');
    }
  },
  findElementInHintsObject({
    state,
    commit,
    getters
  }, payload) {
    let enteredSearch = payload.enteredSearch;
    commit(REFRESH_RECOMENDATION_PINS_GLOBAL, []);
    for (let element in state.hintsObjectGlobal) {
      let hint = state.hintsObjectGlobal[element];

      if (hint.badges.indexOf(enteredSearch) !== -1) {
        hint.counter += 1;
        commit(SET_RECOMENDATION_PINS_GLOBAL, hint.pin)
      }
    }
  },
  iterateRecomendedPins({
    state,
    commit
  }, payload) {
    let pin = payload.pin;
    for (let element in state.hintsObjectGlobal) {
      let hint = state.hintsObjectGlobal[element];
      if (hint.pin === pin) {
        commit(SET_RECOMENDATION_HINTS_GLOBAL, hint);
      }
    }
  },
  pushRecomendedHints({
    state,
    dispatch,
    commit
  }) {
    commit(REFRESH_RECOMENDATION_HINTS_GLOBAL, []);
    let pins = state.recommendedPinsGlobal;
    for (let element in pins) {
      let pin = pins[element];
      dispatch('iterateRecomendedPins', {
        pin: pin
      })
    }
  },
  filterByPin({
    commit,
    dispatch
  }, payload) {
    let pin = payload.pin;
    commit(REFRESH_RECOMENDATION_HINTS_GLOBAL, []);
    dispatch('iterateRecomendedPins', {
      pin: pin
    })
  }
}

const mutations = {
  [REFRESH_RECOMENDATION_PINS_GLOBAL](state, payload) {
    state.recommendedPinsGlobal = payload;
  },
  [SET_RECOMENDATION_PINS_GLOBAL](state, payload) {
    state.recommendedPinsGlobal.push(payload);
  },
  [REFRESH_RECOMENDATION_HINTS_GLOBAL](state, payload) {
    state.recommendedHintsGlobal = payload;
  },
  [SET_RECOMENDATION_HINTS_GLOBAL](state, payload) {
    state.recommendedHintsGlobal.push(payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
