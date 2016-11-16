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
	  'lib/materialize/js/materialize.js', 
	  'js/*.js',
	  'baichunyan/js/bai.js',
	  'Fenghaoan/js/homepage.js',
	  'fish/js/fish.js',
	  'JiaHe/teamleader.js',
	  'Samuel-personalDashboard/personal-dashboard-main.js',
	  'WU_YUNCHEN/js/form.js',
	  'ZhaoLucen/admin.js',
	  'zhuxinyu/myctrl.js',
      'unit_tests/*.js',
      'zhuxinyu/searchEvent.html',
      


    ],
	exclude: [
	],
	preprocessors: {	 	
		 'baichunyan/js/bai.js' : ['coverage'],		
		 'Fenghaoan/js/homepage.js' : ['coverage'],
		 'fish/js/fish.js': ['coverage'],
		 'JiaHe/teamleader.js': ['coverage'],
		 'Samuel-personalDashboard/personal-dashboard-main.js' : ['coverage'],
		 'WU_YUNCHEN/js/form.js' : ['coverage'],
		 'ZhaoLucen/admin.js' : ['coverage'],
		 'zhuxinyu/myctrl.js': ['coverage']
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
