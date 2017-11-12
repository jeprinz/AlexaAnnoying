var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // 'babel-polyfill', // Uncomment this one for certian ES6 features
    './src/index'//,
    // 'webpack-dev-server/client?http://localhost:8080' //Uncoment this for webpack-dev-server
  ],
  target: "node",
  output: {
    publicPath: '/',
    filename: './dist/bundle.js',
    library: "test",
    libraryTarget: "umd"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'flow']
        }
      }
    ]
  },
  devServer: {
    contentBase: "./src"
  }
};
