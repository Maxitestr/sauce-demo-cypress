const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: ['cypress/e2e/**/*.cy.ts', 'cypress/api/**/*.cy.ts'],
    retries: {
      runMode: 2,
      openMode: 0
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on: string, config: object) {
      const allureWriter = require('@shelex/cypress-allure-plugin/writer')
      allureWriter(on, config)
      return config
    }
  },
  env: {
    allureReuseAfterSpec: true
  }
})
