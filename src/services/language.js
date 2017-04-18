import Vue from 'vue'

const translations = {}
// Recherche toutes les ressources de langue
const langResources = require.context('@/resources/i18n/', true, /\.js$/)
langResources.keys().forEach(filename => {
  // Le code de la langue correspond au nom du dossier de la ressource
  let codeLang = filename.replace(/.+\/(.+)\/[^/]+$/, '$1')
  translations[codeLang] = langResources(filename).default
})

// Langue par défaut
const defaultLanguage = window.navigator.userLanguage || window.navigator.language || 'en'

// Permet de retourner la langue actuelle de l'application
const get = () => {
  return Vue.config.lang
}

// Permet de changer la langue si la ressource existe
// Si le localStorage est disponible, on stock la langue pour les autres visites
// Si pas de paramètres, retour à la langue du système (ou anglais)
const set = (lang) => {
  if (lang && translations[lang]) {
    if (window.localStorage) {
      window.localStorage.setItem('favoriteLanguage', lang)
    }
    Vue.config.lang = lang
  } else if (!lang) {
    if (window.localStorage) {
      window.localStorage.setItem('favoriteLanguage', defaultLanguage)
    }
    Vue.config.lang = defaultLanguage
  }
}

// Initialisation de la langue dans Vue
const init = () => {
  // S'il existe un paramètre de langue user
  if (window.localStorage && window.localStorage.getItem('favoriteLanguage')) {
    Vue.config.lang = window.localStorage.getItem('favoriteLanguage')
  } else { // Sinon langue système (ou anglais)
    Vue.config.lang = defaultLanguage
  }
  // Importe les langages dans la conf de Vue
  Object.keys(translations).forEach(lang => {
    Vue.locale(lang, translations[lang])
  })
  // Si jamais une traduction n'est pas complète, affiche les manques en anglais
  Vue.config.fallbackLang = 'en'
}

export default { get, set, init }
