const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/api/**/*.cy.js'],
    retries: {
      runMode: 2,
      openMode: 0
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      const allureWriter = require('@shelex/cypress-allure-plugin/writer')
      allureWriter(on, config)
      return config
    }
  },
  env: {
    allureReuseAfterSpec: true
  }
})
