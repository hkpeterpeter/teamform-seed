//jshint strict: false
module.exports = function(config) {
    config.set({

        basePath: './app',
        frameworks: ['jasmine'],
        files: [
            'lib/jquery.min.js',
            'lib/angular.min.js',
            'lib/angular-route.min.js',
            'lib/angular-mocks.js',
            'lib/firebase.js',
            'lib/angularfire.min.js',
            'app.signup_and_login.js',
            'app.js',
            'unit_tests/test_login.js',
            'randomEvent.js'
        ],
        exclude: [],
        preprocessors: {
            'app.signup_and_login.js': ['coverage'],
            'randomEvent.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            subdir: '.'
        },
        port: 8080,
        colors: true,
        browsers: ['Chrome'],
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage'
        ]

    });
};
