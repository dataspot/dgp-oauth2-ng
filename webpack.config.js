'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglify-js-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './app/index.html')
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
    sourceMap: true
  }));
}

module.exports = {
  entry: {
    'main': [
      './app/index.ts',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'temp'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html', '.less', '.css']
  },
  plugins: plugins,
  devServer: {
    port: process.env.PORT || '4000',
    inline: true,
    historyApiFallback: true,
    contentBase: __dirname,
    stats: {
      modules: false
    }
  }
};
