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
<<<<<<< HEAD
	    'lib/firebase.js',
	    'lib/angularfire.min.js',	  
	    'app.signup_and_login.js',
	    'app.js',
      'unit_tests/test_login.js',
			'randomEvent.js'	  
    ],
	exclude: [
	],
	preprocessors: {	 	
		 'app.signup_and_login.js' : ['coverage'],
		 'randomEvent.js' : ['coverage']
=======
	  'lib/firebase.js',
	  'lib/angularfire.min.js',
    'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js',
	  'app.js',
    'app.route.js',
	  'app.signup_and_login.js',

      'unit_tests/test_login.js'	  
    ],
	exclude: [
	],
	preprocessors: {
    'app.js' : ['coverage'],
		 'app.signup_and_login.js' : ['coverage']
>>>>>>> 52b51433d3f918c09bbb373d17303243aefbcf3e
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
