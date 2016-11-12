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
			'js/site.js',
			'js/main.js',
			'js/helper.js',
			'js/profileCtrl.js',
      'unit_tests/*.js'	  
    ],
	exclude: [
	],
	preprocessors: {	 	
		 'js/*.js' : ['coverage'],		
		//  'js/index.js' : ['coverage'],
		//  'js/admin.js' : ['coverage'],
		//  'js/team.js' : ['coverage'],
		//  'js/member.js' : ['coverage']
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
