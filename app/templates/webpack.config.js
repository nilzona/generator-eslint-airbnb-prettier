const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.ejs',
      templateParameters: {
        name: '<%= name %>',
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.ejs'],
          },
        },
      ],
    }),
  ],
});
