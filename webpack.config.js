/*eslint-env node*/
const { readdirSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const { ProvidePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const absolute = (path) => resolve(__dirname, path);
const packageRoot = '../nexus-desktop/packages';
const packages = existsSync(absolute(packageRoot))
  ? readdirSync(absolute(packageRoot))
  : [];

module.exports = {
  entry: absolute('./src/index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          absolute('src'),
          ...packages.map((path) => absolute(join(packageRoot, path, 'src'))),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.woff|.ttf|.eot|.svg$/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
    },
  },
  output: {
    path: absolute('./dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      publicPath: absolute('public'),
    },
    devMiddleware: {
      stats: 'minimal',
    },
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    allowedHosts: ['.localhost'],
  },
  plugins: [
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
    }),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
    }),
  ],
  // Required to get hot reload working,
  // see: https://github.com/webpack/webpack-dev-server/issues/2758
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
};
