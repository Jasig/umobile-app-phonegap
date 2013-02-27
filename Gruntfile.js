var nconf = require('nconf'),
	config = require('./config');

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	
	clean: {
	  cleanWWW: {
		src: ['www']
	  }
	},

	copy: {
	  main: {
		files: [
		  {src: ['**'], dest: 'www/data/', expand:true, cwd:'src/data/'}
		]
	  }, 
	  images: {
		files: [
		  {src: ['**'], dest: 'www/images/', expand:true, cwd:'src/images/'},
		  {src: ['**'], dest: 'www/data/icons/', expand:true, cwd:'src/data/icons/'},
		  {src: ['**'], dest: 'www/css/lib/jquerymobile/images/', expand:true, 
		   cwd:'src/css/lib/jquerymobile/images'}
		]
	  }
	},

	/** Need to rewrite to support regex patterns */
	targethtml: {
		deploy: {
		  files: {
			'www/index.html': 'src/index.html'
		  }
		},
		deployMap: {
		  files: {
			'www/map.html': 'src/map.html'
		  }
		}, 
		deployNews: {
		  files: {
			'www/news.html': 'src/news.html'
		  }
		}, 
		deployCalendar: {
		  files: {
			'www/calendar.html': 'src/calendar.html'
		  }
		}, 
		deployCourses: {
		  files: {
			'www/courses.html': 'src/courses.html'
		  }
		}
	},

	cssmin: {
	  compressCssFiles: {
		files: {
		  'www/css/portal.css': ['src/css/portal.css'],
		  'www/css/lib/jquerymobile/jqm.theme.css': ['src/css/lib/jquerymobile/jqm.theme.css']
		}
	  }
	},

	htmlmin: {
		  minimizeHtml: {
		   options: {
			removeComments: config.htmlRemoveComments,
			collapseWhitespace: config.htmlCollapseWhitespace
		  },
		   files: {
			'www/index.html': 'www/index.html',
			'www/map.html': 'www/map.html'
		  }
	  }
	},

	jshint: {
	  options: {
		nomen: false,
		curly: true,
		camelcase: true,
		eqeqeq: true,
		newcap: true,
		undef: true,
		trailing: true,
		strict: true,
		latedef: true,
		indent: true,
		quotmark: true
	  },
	  global: {
		define: true,
		window: true,
		document: true
	  },
	  all: [
		'src/js/src/*.js',
		'config/*.js',
		'tasks/*.js',
		'*.js'
	  ]
	},

	uglify: {
	  options: {
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		mangle: config.javascriptMangle,
		compress: true,
		preserveComments: config.javascriptPreserveComments
	  },
	  common_umobile: {
		files: {
		  'www/js/src/app.js': 'src/js/src/app.js',
		  'www/js/src/bootstrap.js': 'src/js/src/bootstrap.js',
		  'www/js/src/config.js': 'src/js/src/config.js',
		  'www/js/src/home.js': 'src/js/src/home.js',

		  'www/js/src/collection/ModuleCollection.js': 'src/js/src/collection/ModuleCollection.js',
		  
		  'www/js/src/model/Credential.js': 'src/js/src/model/Credential.js',
		  'www/js/src/model/Module.js': 'src/js/src/model/Module.js',
		  'www/js/src/model/State.js': 'src/js/src/model/State.js',

		  'www/js/src/service/Authentication.js': 'src/js/src/service/Authentication.js',
		  'www/js/src/service/Session.js': 'src/js/src/service/Session.js',
		  'www/js/src/service/SessionTracker.js': 'src/js/src/service/SessionTracker.js',
		  'www/js/src/service/SessionTrackerMock.js': 'src/js/src/service/SessionTrackerMock.js',
		  'www/js/src/service/Storage.js': 'src/js/src/service/Storage.js',

		  'www/js/src/view/Credential.js': 'src/js/src/view/Credential.js',
		  'www/js/src/view/Module.js': 'src/js/src/view/Module.js',
		  'www/js/src/view/App.js': 'src/js/src/view/App.js'
		}
	  },

	  common_lib: {
		files: {
		  'www/js/lib/backbone/backbone.js': 'src/js/lib/backbone/backbone.js',

		  'www/js/lib/fluid/fluid-all.js': 'src/js/lib/fluid/fluid-all.js',

		  'www/js/lib/gibberish/gibberishAES.js': 'src/js/lib/gibberish/gibberishAES.js',

		  'www/js/lib/handlebars/handlebars.js': 'src/js/lib/handlebars/handlebars.js',
		  'www/js/lib/handlebars/handlebars-runtime.js': 'src/js/lib/handlebars/handlebars-runtime.js',

		  'www/js/lib/jquery/jquery.js': 'src/js/lib/jquery/jquery.js',
		  'www/js/lib/jquery/jquery-pubsub.js': 'src/js/lib/jquery/jquery-pubsub.js',

		  'www/js/lib/jquerymobile/jquery-mobile.js': 'src/js/lib/jquerymobile/jquery-mobile.js',

		  'www/js/lib/jqueryui/jquery-ui.js': 'src/js/lib/jqueryui/jquery-ui.js',

		  'www/js/lib/underscore/underscore.js': 'src/js/lib/underscore/underscore.js',

		  'www/js/lib/cordova/cordova-android.js': 'src/js/lib/cordova/cordova-android.js',
		  'www/js/lib/cordova/cordova-iphone.js': 'src/js/lib/cordova/cordova-iphone.js'

		}
	  }
	},

	// Compile documentation.
	yuidoc: {
		compile: {
			name: '<%= pkg.name %>',
			description: '<%= pkg.description %>',
			version: '<%= pkg.version %>',
			options: {
				paths: 'src/js/src/',
				outdir: 'www/docs/'
			}
		}
	},

	exec: {
		remove_docs: {
	      command: 'rm -fd www/docs',
	      stdout: true,
	      stderr: true
	    },
	    git_checkout_pages: {
	      command: 'git checkout gh-pages',
	      stdout: true,
	      stderr: true
	    },
	}
  });

  // Load plugins/tasks.
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-exec');
  grunt.task.loadTasks('tasks');

  var setup = [];
  var clean = ['clean'];
  var copy = ['copy'];
  var images = [];
  var css = ['cssmin'];
  var javascript = ['uglify'];
  var html = ['targethtml', 'htmlmin'];
  var tearDown = [];

  var taskList = setup.concat(clean, images, css,
							  javascript, html,
							  copy, tearDown);

  grunt.log.ok('Using build environment: ' + config.targetEnvironment);

  // Register tasks.
  grunt.registerTask('docs', ['exec:remove_docs','yuidoc', 'exec:git_checkout_pages']);
  grunt.registerTask('default', taskList);
 
};