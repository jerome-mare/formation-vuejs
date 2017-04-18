import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import params from './modules/params'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  appInfos: {
    version: '1.0.0'
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    params
  },
  strict: debug
})
