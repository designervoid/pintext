
const state = {
  hintsList: [],
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
  hintsList: state => {
      return state.hintsObject.filter(element => element.pin)
  }
}

const actions = {

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
