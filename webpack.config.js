/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const common = x => ({
  ...x,
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        enforce: 'pre',
        test: [/\.(tsx?)|(m?js)$/],
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.json',
          emitError: true,
          emitWarning: true
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
});

//const backend =;
const frontend = common({
  node: {
    __dirname: false
  },
  entry: './src/frontend/wallboard/App.tsx',
  mode: 'development',
  target: 'web', // change to web if web lol
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
});

const backend = common({
  node: {
    __dirname: false
  },
  entry: './src/backend/server.ts',
  mode: 'development',
  target: 'node', // change to web if web lol
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'server.js'
  },
});


module.exports = [frontend, backend];
