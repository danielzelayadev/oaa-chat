module.exports = {
    APP_PATH: './app',
    COMPONENTS_PATH: './app/components',
    PAGES_PATH: './app/pages',
    STORES_PATH: './app/stores',
    TEMPLATES_PATH: './generator-templates',
    isRequired: (value, name) =>  value.length > 0 ? true : `${name} is required.`
}