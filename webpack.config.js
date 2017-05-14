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
      title: 'Marvel Sample'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]']
      }
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
