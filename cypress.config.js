const { defineConfig } = require("cypress");
const tasks = require('./cypress/plugins/task');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // cypress.config.js
     
      tasks(on); // Register the tasks

      // implement node event listeners here
    },
    chromeWebSecurity: false,
  },
  chromeWebSecurity: false,
  // reporter: 'mochawesome',
  // reporterOptions: {
  //   // To display small circular charts regarding test results
  //   charts: true,
  //   // Generate JSON file to create custom reports
  //   json: true,
  //   // Customize the directory in which reports are saved
  //   reportsDir: 'reports/your-reports-folder',
  //   // Customize the report file name
  //   reportFilename: 'my-report',
  //   // Generate new report file or overwrite the a single file
  //   overwrite: false
  // },
  viewportWidth: 1920,
  viewportHeight: 1090,
});
