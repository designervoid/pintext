import {
  REFRESH_RECOMENDATION_PINS_GLOBAL,
  SET_RECOMENDATION_PINS_GLOBAL,
  REFRESH_RECOMENDATION_HINTS_GLOBAL,
  SET_RECOMENDATION_HINTS_GLOBAL,
  SET_BOOKMARK_STATE,
} from '../mutation-types';

const state = {
  hintsObjectGlobal: [{
      id: 1,
      pin: 'GLOBAL - gaming',
      counter: 0,
      title: 'GLOBAL - some title about gaming',
      text: 'GLOBAL - some text here about gaming',
      badges: ['global_game', 'global_gamer', 'global_games', 'global_computer'],
      bookmarked: false,
    },
    {
      id: 2,
      pin: 'GLOBAL - programming',
      counter: 0,
      title: 'GLOBAL - some title about prograaming',
      text: 'GLOBAL - some text here about prograaming',
      badges: ['global_programmer', 'global_code', 'global_coder', 'global_javascript', 'global_computer', 'global_vue', 'global_python'],
      bookmarked: false,
    },
    {
      id: 3,
      pin: 'GLOBAL - computers',
      counter: 0,
      title: 'GLOBAL - some title about computers',
      text: 'GLOBAL - some text here about computers',
      badges: ['global_computer', 'global_network'],
      bookmarked: false,
    }
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
  manualUpdateGettersGlobal({
    state,
    commit,
    getters,
    dispatch
  }) {
    if (state.recommendedPinsGlobal.length === 0) {
      commit(REFRESH_RECOMENDATION_PINS_GLOBAL, [...getters.pinsListGlobal]);
      dispatch('pushRecomendedHintsGlobal');
    }
  },
  findElementInHintsObjectGlobal({
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
  iterateRecomendedPinsGlobal({
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
  pushRecomendedHintsGlobal({
    state,
    dispatch,
    commit
  }) {
    if (state.recommendedPinsGlobal.length === 0) {
      dispatch('manualUpdateGettersGlobal');
      console.log('not searchable')
    }
    commit(REFRESH_RECOMENDATION_HINTS_GLOBAL, []);
    let pins = state.recommendedPinsGlobal;
    for (let element in pins) {
      let pin = pins[element];
      dispatch('iterateRecomendedPinsGlobal', {
        pin: pin
      })
    }
  },
  filterByPinGlobal({
    commit,
    dispatch
  }, payload) {
    let pin = payload.pin;
    commit(REFRESH_RECOMENDATION_HINTS_GLOBAL, []);
    dispatch('iterateRecomendedPinsGlobal', {
      pin: pin
    })
  },
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
  },
  [SET_BOOKMARK_STATE](state, payload) {
    const index = state.hintsObjectGlobal.indexOf(payload.object);
    state.hintsObjectGlobal[index].bookmarked = payload.boolean;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
