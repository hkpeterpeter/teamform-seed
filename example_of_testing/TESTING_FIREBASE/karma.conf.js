//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
	frameworks: ['jasmine'],
    files: [
      'lib/angular.min.js',
      'lib/angular-route.min.js',
      'lib/angular-mocks.js',
      'lib/firebase.js',
      'lib/angularfire.min.js',
      '*.js',
      'unitTest/*.js'	  
    ],
	exclude: [
	],
	preprocessors: {	 	
		 'eventTest.js' : ['coverage']
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
