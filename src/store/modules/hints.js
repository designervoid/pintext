const state = {
  hintsObject: [{
      pin: 'gaming',
      counter: 0,
      badges: ['game', 'gamer', 'games', 'computer'],
    },
    {
      pin: 'programming',
      counter: 0,
      badges: ['programmer', 'code', 'coder', 'javascript', 'computer', 'vue', 'python'],
    },
  ]
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
  }
}

const actions = {
  binarySearch({
    state
  }, payload) {
    let arr = state.pinsList;
    let val = payload.val;
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (arr[mid] === val) {
        return mid;
      }

      if (val < arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return -1;
  },
  findElementInHintsObject({ state }) {

  }
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
