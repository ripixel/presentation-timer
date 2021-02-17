const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvFlow = require('dotenv-flow-webpack');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  mode: mode,
  entry: './src',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, /\.test\./],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: process.env.NODE_ENV === 'development',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]___[hash:base64:5].[ext]',
              outputPath: 'assets/img',
              userRelativePaths: true,
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DotenvFlow({
      default_node_env: 'development',
      system_vars: true,
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new TypedCssModulesPlugin({
      globPattern: 'src/**/*.scss',
    }),
  ],
  output: {
    filename: '[name]___[hash:base64:5].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
