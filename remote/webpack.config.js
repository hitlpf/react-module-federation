const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/Button.jsx',
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
  },
  devServer: {
    port: 8081,
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    headers: { 'Access-Control-Allow-Origin': '*' }, // 允许跨域
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',   // 唯一标识符，需与主应用配置一致
      filename: 'remoteEntry.js', // 入口文件名称
      exposes: {
        './Button': './src/Button.jsx', // 暴露组件路径
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true },
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