// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import App from './App'
import router from './router'
import parameters from '@/services/parameters'

Vue.config.productionTip = false

if (PROD) {
  let OfflinePluginRuntime = require('offline-plugin/runtime')
  OfflinePluginRuntime.install({
    onUpdateReady: () => {
      OfflinePluginRuntime.applyUpdate()
    },
    onUpdated: () => {
      window.location.reload()
    }
  })
}

/**
 * Initialisation de l'ihm de l'application via le framework Quasar
 */
function initHmi (params) {
  Vue.use(Quasar) // Install Quasar Framework
  Quasar.start(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#q-app',
      data: params,
      router,
      template: '<App/>',
      components: { App }
    })
  })
}

let userParam = parameters.selectUserParameters(location)

// # Chargement du paramétrage de l'application
parameters.getParameters(userParam)

  // # Initialisation de l'interface graphique
  .then(initHmi)
  // Gestion des erreurs éventuelles
  .catch((err) => {
    console.log(err)
    alert('Unable to start Application<br/ >Application has been reseted<br />Reload it')
  })
