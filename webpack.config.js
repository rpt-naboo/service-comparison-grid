var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        tests : /\.jsx?/,
        include : SRC_DIR,
        loaders : ['babel-loader', 'style-loader', 'css-loader'],
        query: {
          presets: ['react', 'es2015']
       }
      }
    ]
  }
};