const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

useDefaultConfig[env].resolve.alias = {
    "@components": path.resolve('./src/components'),
    "@containers": path.resolve('./src/containers'),
    "@actions": path.resolve('./src/actions'),
};

module.exports = function () {
    return useDefaultConfig;
};