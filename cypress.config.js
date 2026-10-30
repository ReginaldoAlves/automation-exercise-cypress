const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Relatório HTML (orientação do professor: cypress-mochawesome-reporter)
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportPageTitle: 'Relatório de Testes - Automation Exercise',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  viewportWidth: 1366,
  viewportHeight: 768,
  video: false,
  screenshotOnRunFailure: true,

  // O site é lento em alguns momentos; timeouts um pouco maiores evitam falsos negativos
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,

  // Retentativas apenas no `cypress run` (CI), para absorver instabilidades do site
  retries: {
    runMode: 2,
    openMode: 0
  },

  // Bloqueia anúncios e rastreadores do site, que causam pop-ups (vignette) e lentidão
  blockHosts: [
    '*googlesyndication.com',
    '*doubleclick.net',
    '*googleadservices.com',
    '*adservice.google.com',
    '*google-analytics.com',
    '*googletagmanager.com',
    '*googletagservices.com',
    '*fundingchoicesmessages.google.com'
  ],

  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})
