const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-cheap-source-map',
  mode: 'development',
  entry: {
    vk_app_dev: "./src/vk_app/index.js",
    plug: "./src/plug/index.js"
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    publicPath: 'dist/',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(eot|gif|svg|ttf|woff|woff2|jpg)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // new BrotliPlugin({
    //   test: /\.js$|\.css$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.jpg']
  },
  devServer: {
    inline: true,
    port: 10000
  }
}