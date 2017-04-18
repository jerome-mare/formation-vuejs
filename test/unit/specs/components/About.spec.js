import Vue from 'vue'
import About from '@/components/About'

import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Language from '@/services/language'
import Quasar from 'quasar'

import store from '@/store'

Vue.config.devtools = false

before(() => {
  // Use VueI18n for internationalisation support
  Vue.use(Quasar)
  Vue.use(Vuex)
  Vue.use(VueI18n)
  Language.init()
})

describe('About.vue', () => {
  it('Instanciate component', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    let vm = new Vue({
      el: el,
      render: (h) => h(About),
      store: store
    })
    expect(vm).to.exist
  })
})
