
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');

const webpack_isomorphic_tools_plugin = 
  new Webpack_isomorphic_tools_plugin(require('./webpack-isomorphic-tools-configuration'))
  .development();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/../client/index.html`,
    filename: 'index.html',
    inject: false
});
console.log(process.env.NODE_ENV)
module.exports = {
    context: path.join(__dirname,'..'),
    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
        './client/index.js'
    ],
    output:{
        path: `${__dirname}/../assets/dist`,
        publicPath: 'http://localhost:3001/public/',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                loaders: ["react-hot-loader","babel-loader"],
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loaders: ['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                loaders: ['style-loader','css-loader','sass-loader']
            },
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('images'),
                loader: 'url-loader?limit=10240',
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        webpack_isomorphic_tools_plugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.BannerPlugin("This file is created by Luo Xia")
    ]
}