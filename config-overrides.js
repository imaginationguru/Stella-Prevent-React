const {override, addWebpackAlias} = require('customize-cra');
const path = require('path');
module.exports = override(
  addWebpackAlias({
    ['@components']: path.resolve(__dirname, './src/components'),
    ['@containers']: path.resolve(__dirname, './src/containers'),
    ['@helpers']: path.resolve(__dirname, './src/helpers'),
    ['@constants']: path.resolve(__dirname, './src/constants'),
    ['@config']: path.resolve(__dirname, './src/config'),
    ['@actions']: path.resolve(__dirname, './src/actions'),
    ['@reducers']: path.resolve(__dirname, './src/reducers'),
    ['@store']: path.resolve(__dirname, './src/store'),
    ['@utils']: path.resolve(__dirname, './src/utils'),
    ['@assets']: path.resolve(__dirname, './src/assets'),
    ['@i18n']: path.resolve(__dirname, './src/i18n'),
    ['@reducers']: path.resolve(__dirname, './src/reducers'),
  }),
);
