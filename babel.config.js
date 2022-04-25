const commonPlugins = [
  [
    'module:react-native-dotenv',
    {
      moduleName: 'react-native-dotenv',
      "path": ".env",
      "allowUndefined": false,
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...commonPlugins],
};
