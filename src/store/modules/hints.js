import { REFRESH_RECOMENDATION_PINS, SET_RECOMENDATION_PINS, SET_RECOMENDATION_HINTS  } from '../mutation-types';

const state = {
  hintsObject: [
    {
      pin: 'gaming',
      counter: 0,
      title: 'some title about gaming',
      text: 'some text here about gaming',
      badges: ['game', 'gamer', 'games', 'computer'],
    },
    {
      pin: 'programming',
      counter: 0,
      title: 'some title about prograaming',
      text: 'some text here about prograaming',
      badges: ['programmer', 'code', 'coder', 'javascript', 'computer', 'vue', 'python'],
    },
    {
      pin: 'computers',
      counter: 0,
      title: 'some title about computers',
      text: 'some text here about computers',
      badges: ['computer', 'network'],
    },
  ],
  recommendedPins: [],
  recommendedHints: []
}

const getters = {
  pinsList: state => {
    let arr = [];
    for (let element in state.hintsObject) {
      let hint = state.hintsObject[element];
      arr.push(hint.pin);
    }
    return arr
  },
  hintsList: state => {
    let arr = [];
    for (let element in state.hintsObject) {
      let hint = state.hintsObject[element];
      arr.push(hint.badges);
    }
    let merged = arr.flat(1);
    return merged
  },
}

const actions = {
  // binarySearch({
  //   state
  // }, payload) {
  //   let arr = state.pinsList;
  //   let val = payload.val;
  //   let start = 0;
  //   let end = arr.length - 1;
  //
  //   while (start <= end) {
  //     let mid = Math.floor((start + end) / 2);
  //
  //     if (arr[mid] === val) {
  //       return mid;
  //     }
  //
  //     if (val < arr[mid]) {
  //       end = mid - 1;
  //     } else {
  //       start = mid + 1;
  //     }
  //   }
  //
  //   return -1;
  // },
  findElementInHintsObject({ state, commit }, payload) {
    let enteredSearch = payload.enteredSearch;
    commit(REFRESH_RECOMENDATION_PINS, []);
    for (let element in state.hintsObject) {
      let hint = state.hintsObject[element];

      if (hint.badges.indexOf(enteredSearch) !== -1) {
          hint.counter += 1;
          commit(SET_RECOMENDATION_PINS, hint.pin)
      }
    }
  },
  iterateRecomendedPins({ state, commit }, payload) {
    let pin = payload.pin;
    for (let element in state.hintsObject) {
      let hint = state.hintsObject[element];
      if (hint.pin === pin) {
        commit(SET_RECOMENDATION_HINTS, hint);
      }
    }
  },
  pushRecomendedHints({ state, dispatch }) {
    let pins = state.recommendedPins;
    for (let element in pins) {
      let pin = pins[element];
      dispatch('iterateRecomendedPins', { pin: pin })
    }
  }
}

const mutations = {
  [REFRESH_RECOMENDATION_PINS](state, payload) {
    state.recommendedPins = payload;
  },
  [SET_RECOMENDATION_PINS](state, payload) {
    state.recommendedPins.push(payload);
  },
  [SET_RECOMENDATION_HINTS](state, payload) {
    state.recommendedHints.push(payload);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
