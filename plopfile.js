const componentGen = require('./generators/component-gen')
const storeGen = require('./generators/store-gen')
const InquirerDirectory = require('inquirer-directory')

module.exports = plop => {
  plop.addPrompt('directory', InquirerDirectory)

  plop.setGenerator('Component Generator', componentGen)
  plop.setGenerator('Store Generator', storeGen)
}