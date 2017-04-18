var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var env = require('./env-utils')
var vueLoaderConfig = require('./vue-loader.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var envDefinition = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config[env.prod ? 'build' : 'dev'].env

var userParamsFiles =
    ((env.dev || env.test) && resolve('src/params')) ||
    (env.prod && resolve('src/params/params.user.yaml'))

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'quasar': resolve('node_modules/quasar-framework/'),
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(yml|yaml)$/,
        loader: ['json-loader', 'yaml-loader'],
        include: [resolve('src'), resolve('test')],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': envDefinition,
      'DEV': env.dev,
      'PROD': env.prod,
      '__THEME': '"' + env.platform.theme + '"'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve('src/params/params.default.yaml') },
      { from: userParamsFiles, to: 'params', ignore: ['params.default.yaml'] },
    ],
    {
      copyUnmodified: true
    })
  ]
}
