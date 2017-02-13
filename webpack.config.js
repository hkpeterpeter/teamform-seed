'use strict';

require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');

let ENV = process.env.npm_lifecycle_event;
let isTest = ENV === 'test' || ENV === 'test-watch';
let isProd = ENV === 'build';
let CONFIG = require('./config.js');

module.exports = function makeWebpackConfig() {

    let config = {};

    config.entry = isTest
        ? {}
        : {
            app: './src/app/app.js',
            vendor: './src/app/vendor.js'
        };

    config.resolve = {
        modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
    };

    config.output = isTest
        ? {}
        : {
            path: __dirname + '/dist',
            publicPath: isProd
                ? CONFIG.CDN_URL || './'
                : 'http://localhost:8080/',
            filename: isProd
                ? '[name].[hash].js'
                : '[name].bundle.js',
            chunkFilename: isProd
                ? '[id].[hash].js'
                : '[id].bundle.js'
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
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /(node_modules|bower_components)/
            }, {
                test: /\.css$/,
                loader: isTest
                    ? 'null'
                    : ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
            }, {
                test: /\.scss$/,
                loaders: [
                    'style', 'css', 'postcss', 'sass'
                ],
                include: /(global)/
            }, {
                test: /\.scss$/,
                loaders: [
                    'style', 'css?modules&localIdentName=[hash:base64:10]', 'postcss', 'sass'
                ],
                exclude: /(global)/
            }, {
                test: /\.json$/,
                loader: 'json'
            },, {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=/assets/font/[hash].[ext]'
            }, {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=/assets/font/[hash].[ext]'
            }, {
                test: /\.(svg|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.(gif|png|jpe?g)$/,
                loaders: ['url-loader?limit=10000&name=/assets/images/[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false']
            }, {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    };

    if (isTest) {
        config.module.preLoaders.push({
            test: /\.js$/,
            exclude: [
                /node_modules/, /__tests__/, /test.webpack.js$/
            ],
            loader: 'isparta'
        })
    } else {
        config.module.preLoaders.push({test: /\.js$/, loader: 'eslint', exclude: /(node_modules|bower_components|__tests__)/});
    }

    config.postcss = [require('autoprefixer')({browsers: ['last 3 version']})];
    config.plugins = [
        new ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'root.jQuery': 'jquery', '_': 'lodash'}),
        new webpack.ResolverPlugin(new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])),
        new DefinePlugin({ENV: JSON.stringify(CONFIG)})
    ];

    if (!isTest) {
        config.plugins.push(new HtmlWebpackPlugin({template: './src/public/index.html', inject: 'body'}), new ExtractTextPlugin('[name].[hash].css', {
            disable: !isProd
        }))
    }

    if (!isProd) {
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    if (isProd) {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }), new webpack.NoErrorsPlugin(), new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin(), new CopyWebpackPlugin([
            {
                from: __dirname + '/src/public'
            }
        ]), new CompressionPlugin({asset: '[path].gz[query]', algorithm: 'gzip', test: /\.css$|\.js$|\.html$/, threshold: 10240, minRatio: 0.8}), new S3Plugin({
            exclude: /\.(html|xml|txt)$/,
            s3Options: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION
            },
            s3UploadOptions: {
                Bucket: process.env.AWS_BUCKET,
                CacheControl: 'max-age=315360000, no-transform, public',
                ContentEncoding(fileName) {
                    if (/\.gz$/.test(fileName)) {
                        return 'gzip';
                    }
                }
            },
            cdnizerOptions: {
                defaultCDNBase: CONFIG.CDN_URL
            }
        }));
    }

    config.devServer = {
        contentBase: './src/public',
        hot: true,
        colors: true,
        inline: true,
        compress: true,
        proxy: {
            '/oauth': {
                target: 'http://localhost:' + (process.env.PORT || 3000) + '/'
            }
        },
        stats: 'minimal'
    };
    return config;
}();
