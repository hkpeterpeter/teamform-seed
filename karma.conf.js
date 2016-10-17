'use strict';

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            'src/test.webpack.js',
        ],
        exclude: [],
        preprocessors: {
            'src/test.webpack.js': ['webpack', 'sourcemap'],
        },
        webpack: require('./webpack.config.js'),
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            subdir: '.'
        },
        port: 9876,
        colors: true,
        browsers: ['Chrome'],
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-webpack',
            'karma-sourcemap-loader',
        ],
        webpackMiddleware: {
            noInfo: 'errors-only'
        }
    });
};
