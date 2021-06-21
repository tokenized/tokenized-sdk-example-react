/* eslint-disable no-undef */
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-transform-runtime', 'react-refresh/babel'],
};
