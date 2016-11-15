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
            'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js',
            'app.js',
            'app.route.js',
            'app.signup_and_login.js',
            'event.js',
            'unit_tests/test_login.js',
            'unit_tests/test_createEvent.js',
            'unit_tests/test_createTeam.js'
        ],
        exclude: [],
        preprocessors: {
            'app.js': ['coverage'],
            'event.js': ['coverage'],
            'app.signup_and_login.js' : ['coverage'],
            'createTeam.js' : ['coverage']
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
