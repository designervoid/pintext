import {
  APPEND_HINTS_OBJECT_USER_SAVED,
  SPLICE_HINTS_OBJECT_USER_SAVED,
  REFRESH_RECOMENDATION_PINS_USER_SAVED,
  SET_RECOMENDATION_PINS_USER_SAVED,
  REFRESH_RECOMENDATION_HINTS_USER_SAVED,
  SET_RECOMENDATION_HINTS_USER_SAVED
} from '../mutation-types';

const state = {
  hintsObjectUserSaved: [{
      id: 7,
      pin: 'USER_SAVED - gaming',
      counter: 0,
      title: 'USER_SAVED - some title about gaming',
      text: 'USER_SAVED - some text here about gaming',
      badges: ['user_saved_another_game', 'user_saved_gamer', 'user_saved_games', 'user_saved_computer'],
    },
    {
      id: 8,
      pin: 'USER_SAVED - programming',
      counter: 0,
      title: 'USER_SAVED - some title about prograaming',
      text: 'USER_SAVED - some text here about prograaming',
      badges: ['user_saved_programmer', 'user_saved_code', 'user_saved_coder', 'user_saved_javascript', 'user_saved_computer', 'user_saved_vue', 'user_saved_python'],
    },
    {
      id: 9,
      pin: 'USER_SAVED - computers',
      counter: 0,
      title: 'USER_SAVED - some title about computers',
      text: 'USER_SAVED - some text here about computers',
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
    commit(REFRESH_RECOMENDATION_PINS_USER_SAVED, [...getters.pinsListUserSaved]);
    dispatch('pushRecomendedHintsUserSaved');
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
    if (state.recommendedPinsUserSaved.length === 0) {
      console.log('not found anything')
    }
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
  [APPEND_HINTS_OBJECT_USER_SAVED](state, payload) {
    state.hintsObjectUserSaved.push(payload);
  },
  [SPLICE_HINTS_OBJECT_USER_SAVED](state, payload) {
    const index = state.hintsObjectUserSaved.indexOf(payload);
    state.hintsObjectUserSaved.splice(index, 1);
  },
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
