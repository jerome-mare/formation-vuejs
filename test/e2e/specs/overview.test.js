// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#q-app', 1000)
      .assert.elementPresent('.demo')
      .assert.elementCount('.demo', 1)
      .saveScreenshot('./dist/screenshot/01-home-screen.png')
      .end()
  }
}
