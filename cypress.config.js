const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // 🔹 Где лежат тесты
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // 🔹 Базовый URL приложения
    baseUrl: 'https://next.privat24.ua/',

    // 🔹 Таймауты (реальные значения для проектов)
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,

    // 🔹 Поведение тестов
    retries: {
      runMode: 2,   // CI
      openMode: 0,  // локально
    },

    // 🔹 Видео и скриншоты
    video: false,               // включай в CI при необходимости
    screenshotOnRunFailure: true,

    // 🔹 Изоляция тестов (best practice)
    testIsolation: true,

    // 🔹 Безопасность
    chromeWebSecurity: false,   // часто нужно для SPA

    // 🔹 Логи и артефакты
    trashAssetsBeforeRuns: true,

    // 🔹 Node events (плагины)
    setupNodeEvents(on, config) {
      // on('task', {})
      return config
    },
  },
})

