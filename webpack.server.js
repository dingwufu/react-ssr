const path = require('path');
const base = require('./webpack.base');
const merge = require('webpack-merge');
const nodeExternal = require('webpack-node-externals');
module.exports = merge(base, {
    target: 'node', // 告诉webpack 打包后将要运行的环境
    entry: './src/server/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'server.js'
    },
    // 忽略打包node核心模块
    externals: [nodeExternal()],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'isomorphic-style-loader', // 服务端使用避免dom操作
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
});