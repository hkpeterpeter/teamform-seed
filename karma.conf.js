//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
    frameworks: ['jasmine'],
    files: [
      'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.7/angular.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.7/angular-route.min.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'https://www.gstatic.com/firebasejs/3.0.3/firebase.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angularFire/2.0.0/angularfire.min.js',
      'js/*.js',
      'unit_tests/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'js/site.js' : ['coverage'],
      'js/index.js' : ['coverage'],
      'js/admin.js' : ['coverage'],
      'js/team.js' : ['coverage'],
      'js/member.js' : ['coverage']
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
