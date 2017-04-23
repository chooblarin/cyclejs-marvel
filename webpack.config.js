const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.resolve(__dirname, 'dist') 
}

const common = {
  entry: PATHS.app,

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Let\'s Cycle!'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
}

if ('start' == TARGET || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      hot: true
    }
  });
}

if ('build' == TARGET) {
  module.exports = merge(common, {});
}
