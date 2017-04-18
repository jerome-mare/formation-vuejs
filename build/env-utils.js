var theme = process.argv[2] || 'mat'

if (process.env.NODE_ENV === 'testing') {
  theme = 'mat'
}

module.exports = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'testing',

  platform: {
    theme: theme,
    cordovaAssets: './cordova/platforms/' + (theme === 'mat' ? 'android' : 'ios') + '/platform_www'
  }
}
