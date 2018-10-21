/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
    resolve: {
        extensions: [.js', '.json']
    },
    node: {
        fs: 'empty'
    },
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                  exclude: /(node_modules)/,
                  use: [
                    {
                      loader: 'babel-loader',
                      options: {
                        presets: ['react']
                      }
                    }
                  ]
            },
            {
                test:  /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            },
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    performance: { hints: false },
    plugins: [
        new webpack.WatchIgnorePlugin([
            /\.js$/
        ])
    ]
});
