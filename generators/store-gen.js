const genUtils = require('./gen-utils')

module.exports = {
    description: 'This generates a mobx store.',
    prompts: [
    {
        type: 'input',
        name: 'name',
        message: 'What is your store\'s name?',
        validate: value => genUtils.isRequired(value, "Store name")
    }
    ],
    actions: [
        {
            type: 'add',
            path: `${genUtils.STORES_PATH}/{{dashCase name}}.js`,
            templateFile: `${genUtils.TEMPLATES_PATH}/store.js`
        }
    ]
}