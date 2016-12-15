const genUtils = require('./gen-utils')

module.exports = {
    description: 'This generates a basic React.js component.',
    prompts: [
    {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
        validate: value => genUtils.isRequired(value, "Component name")
    },
    {
        type: 'checkbox',
        name: 'options',
        message: 'What would you like for your component?',
        choices: [ 'Stylesheet', 'Observer Decorator', 'Class Declaration' ]
    },
    {
        type: 'directory',
        name: 'path',
        message: 'Choose where you want your component:',
        basePath: genUtils.APP_PATH
    }
    ],
    actions: data => {
        const actions = []
        const componentPath = `${genUtils.APP_PATH}/{{path}}/{{properCase name}}`

        data.observer = data.options.indexOf('Observer Decorator') >= 0
        data.stylesheet = data.options.indexOf('Stylesheet') >= 0

        actions.push({
            type: 'add',
            path: `${componentPath}/{{properCase name}}.js`,
            templateFile: `${genUtils.TEMPLATES_PATH}/component-${
                data.options.indexOf('Class Declaration') >= 0 ?
                'class' : 'funct'
            }.js`
        })

        actions.push({
            type: 'add',
            path: `${componentPath}/index.js`,
            templateFile: `${genUtils.TEMPLATES_PATH}/index.js`
        })

        if (data.stylesheet)
            actions.push({
                type: 'add',
                path: `${componentPath}/{{properCase name}}.css`,
                template: ' '
            })

        return actions
    }
}