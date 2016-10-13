'use strict';

// Modules
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    var config = {};

    config.entry = isTest ? {} : {
        app: './src/app/index.js',
        vendor: './src/app/vendor.js'
    };

    config.output = isTest ? {} : {
        path: __dirname + '/dist',
        publicPath: isProd ? '/' : 'http://localhost:8080/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        preLoaders: [],
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: isTest ? 'null' : ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
        }, {
            test: /\.woff$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
        }, {
            test: /\.woff2$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
        }, {
            test: /\.(eot|ttf|svg|gif|png|jpg|jpeg)$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    };

    if (isTest) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'isparta-loader'
        })
    }

    config.postcss = [
        autoprefixer({
            browsers: ['last 3 version']
        })
    ];

    config.plugins = [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        }),
    ];

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body'
            }),
            new ExtractTextPlugin('[name].[hash].css', {
                disable: !isProd
            })
        )
    }

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        )
    }

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };
    return config;
}();
