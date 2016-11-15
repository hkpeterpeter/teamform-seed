//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './',
        frameworks: ['jasmine'],
        files: [
            'app/lib/jquery.min.js',
            'app/lib/angular.min.js',
            'app/lib/angular-route.min.js',
            'app/lib/angular-mocks.js',
            'app/lib/firebase.js',
            'app/lib/angularfire.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
			'node_modules/mockfirebase/browser/mockfirebase.js',
            'app/js/main.js',
            'app/js/*.js',
            'app/directives/*.js',
            'app/unit_tests/*.js'
        ],
        exclude: [],
        preprocessors: {
            'app/js/main.js': ['coverage'],
            'app/js/index.js': ['coverage'],
            'app/js/admin.js': ['coverage'],
            'app/js/team.js': ['coverage'],
            'app/js/member.js': ['coverage'],
            'app/directives/member-card.js': ['coverage']
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
