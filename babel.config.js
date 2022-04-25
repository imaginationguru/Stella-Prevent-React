const commonPlugins = [
  [
    'module:react-native-dotenv',
    {
      moduleName: 'react-native-dotenv',
      "path": ".env",
      "allowUndefined": false,
    },
  ],
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      extensions: ['.ios.js', '.android.js', '.js', '.json'],
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@containers': './src/containers',
        '@config': './src/config',
        '@actions': './src/actions',
        '@constants': './src/constants',
        '@helpers': './src/helpers',
        '@images': './src/assets/images',
        '@reducers': './src/reducers',
        '@store': './src/store',
        '@utils': './src/utils',
        '@hoc': './src/hoc',
        '@localization': './src/localization',
        '^@/(.+)': './src/\\1', // @/folder will be an alias to <root>/src/folder
      },
    },
  ],
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...commonPlugins],
};
