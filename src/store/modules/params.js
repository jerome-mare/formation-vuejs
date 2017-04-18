import * as mutationTypes from '../mutation-types'
import * as actionTypes from '../action-types'
import * as getterTypes from '../getter-types'

const state = {
}

// getters
const getters = {
  [getterTypes.params]: state => {
    return state
  }
}

const actions = {
  [actionTypes.initParams] ({ commit }, params) {
    commit(mutationTypes.CLEAR_PARAMS)
    commit(mutationTypes.SET_PARAMS, params)
  }
}

const mutations = {
  [mutationTypes.CLEAR_PARAMS] (state) {
    Object.keys(state).forEach((param) => {
      state[param] = {}
    })
  },
  [mutationTypes.SET_PARAMS] (state, params) {
    Object.keys(params).forEach((param) => {
      state[param] = params[param]
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
