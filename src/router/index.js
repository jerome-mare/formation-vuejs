import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import Language from '@/services/language'

// Initialisation des plugins vuejs au niveau du router
// car ce dernier instancie la vue

// Use VueI18n for internationalisation support
Vue.use(VueI18n)
Language.init()

// Use Vuex for store management
Vue.use(Vuex)

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`@/components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('About') }, // Default
    { path: '/about', component: load('About') },
    { path: '/operations', component: load('Operations') },
    { path: '/map', component: load('Gmapv') },
    { path: '*', component: load('About') } // Not found
  ]
})
