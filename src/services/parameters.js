// Ce service permet d'obtenir le paramétrage de l'application
// Ce paramétrage est défini dans deux fichiers :
// - params.default.yaml : Paramétrage de l'application définie en développement
// - params.user.yaml : Surcharge de l'administarteur de l'application
// Le paramétrage utilisateur utilisateur peut utiliser un autre fichier.
// Dans ce cas, c'est un paramétre query de la requète HTTP GET qui défini ce fichiers
import Yaml from 'js-yaml'
import request from 'superagent'
import queryString from 'query-string'
import { Platform } from 'quasar'

// Explicit merge of user params into default params (app parameter)
const _mergeParams = function (app, user) {
  let params = app

  // Merge user and app parameters as needed
  // If user exists it replaces app parameters
  params = user || app

  return params
}

const selectUserParameters = function (loc) {
  let l = loc || location
  // Get from url parameters yaml file to be applied
  let urlOptionsSearch = queryString.parse(l.search)
  let urlOptionsHash = queryString.parse(l.hash.slice(2))
  let userParam = urlOptionsSearch.p || urlOptionsHash.p || 'user'
  return userParam
}

const _getUserParametersForElectron = function () {
  let { app } = window.require('electron').remote
  let userParametersFile = app.getAppPath()
  userParametersFile = userParametersFile.substring(0, userParametersFile.lastIndexOf('/')) + '/params.yaml'
  const fs = window.require('fs')
  let userParams = {}
  if (fs.existsSync(userParametersFile)) {
    let params = fs.readFileSync(userParametersFile, { encoding: 'utf8' })
    userParams = Yaml.safeLoad(params)
  }
  return userParams
}

const _getUserParameters = function (user) {
  let userParameters
  if (PROD && Platform.is.electron) {
    // Traitement du cas où nous sommes dans Electron
    let params = _getUserParametersForElectron()
    userParameters = Promise.resolve(params)
  } else {
    // Traitement du cas où nous sommes dans une WebApp
    let userParamsResource = user || 'user'
    let userParametersPath = 'params/params.' + userParamsResource + '.yaml'
    userParameters = request.get(userParametersPath).then(response => {
      let userParams = Yaml.safeLoad(response.text)
      return Promise.resolve(userParams)
    })
  }
  return userParameters
}

const _getDefaultParameters = function () {
  let parameters = request.get('params.default.yaml').then(response => {
    let defaultParams = Yaml.safeLoad(response.text)
    return Promise.resolve(defaultParams)
  })
  return parameters
}

// Get Parameters from params file : default and user
// Return a Promise to handle callback
const getParameters = function (user) {
  // Load parameters
  let defaultParams = {}

  let p = new Promise((resolve, reject) => {
    _getDefaultParameters().then(parameters => {
      defaultParams = parameters
      return _getUserParameters(user)
    }).then(userParams => {
      let params = _mergeParams(defaultParams, userParams)
      resolve(params)
    }).catch(err => {
      reject('Unable to load parameters: ' + err)
    })
  })

  return p
}

export default {
  getParameters,
  selectUserParameters
}
