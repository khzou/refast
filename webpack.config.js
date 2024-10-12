const webpack = require('webpack');
const path = require('path'); // Import path module

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Update this line
    filename: 'index.js',
    library: 'refast',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src') // Update this line
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      var: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    }
  },
  plugins: [
    // Remove DedupePlugin as it is no longer available
    // new webpack.optimize.DedupePlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
