/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    node: {
        __dirname: false
    },
    entry: './frontend/wallboard/App.tsx',
    mode: 'development',
    target: 'web', // change to web if web lol
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                enforce: 'pre',
                test: [/\.(tsx?)|(m?js)$/],
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: "./.eslintrc.json",
                    emitError: true,
                    emitWarning: true,
                },
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
