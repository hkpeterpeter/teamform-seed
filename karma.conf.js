//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
	frameworks: ['jasmine'],
    files: [
    'lib/loader.js',
	  'lib/jquery.min.js',
      'lib/angular.min.js',
      'lib/angular-route.min.js',
      'lib/angular-mocks.js',
      'lib/angular-cookies.min.js',
	  'lib/firebase.js',
	  'lib/angularfire.min.js',
    'zwangbm/js/*.js',
    'jzhangbs/*.js',
    'TXR/*.js',
    'search/*.js',
      'unit_tests/*.js',

    ],
	exclude: [
	],
	preprocessors: {
		 'zwangbm/js/angular_invite.js' : ['coverage'],
		 'jzhangbs/*.js' : ['coverage'],
		 'TXR/*.js': ['coverage'],
     'search/search-page.js' : ['coverage']

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
