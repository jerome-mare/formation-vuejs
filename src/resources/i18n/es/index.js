const langFiles = require.context('./', true, /\.yaml$/)
const translation = {}

langFiles.keys().forEach(filename => {
  Object.assign(translation, langFiles(filename))
})

export default translation
