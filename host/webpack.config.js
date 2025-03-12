const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (...arg) => path.join(__dirname, ...arg);
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`,
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:8081/remoteEntry.js', // 子应用入口
      },
      shared: {
        react: { singleton: true, eager: true,}, // 共享依赖
        'react-dom': { singleton: true,  eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html'),
      inject: true, // 为true会默认插入生成的js
      cache: false,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyJS: {
          compress: {
            sequences: false,
          },
        },
        minifyCSS: true,
        ignoreCustomFragments: [/<%[^>]+%\>/, /\{%[^}]+%\}/, /\{\{[^}]+\}\}/],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};
