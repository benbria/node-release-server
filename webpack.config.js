"use strict";

const path    = require('path');

module.exports = {
    entry: [
        './src/client/index.js'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules"),
        modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', path.resolve(__dirname, './node_modules')]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/assets',
        filename: 'index.js'
    },
    devServer: {
        contentBase: './dist'
    }
};
