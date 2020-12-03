const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: path.resolve(__dirname, 'src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'eval-source-map',
  devServer: {
    stats: 'minimal',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
  },
  stats: 'minimal',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.ejs',
      templateParameters: {
        name: '<%= name %>',
      },
      scriptLoading: 'defer',
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
