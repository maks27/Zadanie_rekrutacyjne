module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './app.js',
  output: {
    filename: 'app.js',
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  
};
