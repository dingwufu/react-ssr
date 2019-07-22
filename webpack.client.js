const path = require('path');
const base = require('./webpack.base');
const merge = require('webpack-merge');
module.exports = merge(base, {
    entry: './src/client/index.js',
    output: {
        path: path.resolve('public'),
        filename: 'client.js'
    }
});