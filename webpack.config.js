const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvFlow = require('dotenv-flow-webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

if (mode === 'production' && process.env.BUILD_NUM) {
  process.env.VERSION =
    'v' + process.env.BUILD_NUM + '-' + process.env.NODE_ENV;
}

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
    // new FaviconsWebpackPlugin({
    //   logo: './public/assets/favicon.png',
    //   mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
    //   devMode: 'light', // optional can be 'webapp' or 'light' - 'light' by default })
    //   favicons: {
    //     path: '/icons', // Path for overriding default icons path. `string`
    //     appName: 'Weardrobe', // Your application's name. `string`
    //     appDescription:
    //       'Share your clothes with your friends with Weardrobe.co.uk', // Your application's description. `string`
    //     developerName: 'James King', // Your (or your developer's) name. `string`
    //     developerURL: 'https://github.com/ripixelcodes', // Your (or your developer's) URL. `string`
    //     dir: 'auto', // Primary text direction for name, short_name, and description
    //     lang: 'en-GB', // Primary language for name and short_name
    //     background: '#333', // Background colour for flattened icons. `string`
    //     theme_color: '#333', // Theme color user for example in Android's task switcher. `string`
    //     appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
    //     display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
    //     orientation: 'portrait', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
    //     scope: '/', // set of URLs that the browser considers within your app
    //     start_url: '/', // Start URL when launching the application from a device. `string`
    //     version: '1.0', // Your application's version string. `string`
    //     logging: false, // Print logs to console? `boolean`
    //     pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
    //     loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
    //     icons: {
    //       android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //       yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    //     },
    //   },
    // }),
  ],
  output: {
    filename: '[name]___[hash:base64:5].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
