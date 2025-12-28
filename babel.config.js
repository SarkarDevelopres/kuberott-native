module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './app',
            '@components': './components',
          },
        },
      ],
      'react-native-reanimated/plugin',  // must be the last plugin
    ],
  };
};
