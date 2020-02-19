/* eslint-disable */
const path = require('path');


module.exports = {
    node: {
        __dirname: false
    },
    entry: './src/wallboard/Entry.tsx',
    mode: 'development',
    target: 'node', // change to web if web lol
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
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
