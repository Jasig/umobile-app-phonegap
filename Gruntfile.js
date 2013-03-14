/*global exports:true, module:true, require:true */

// Modules & variables.
var nconf = require('nconf'),
	config = require('./config');

// Grunt.
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Cleans out directories.
		clean: {
			dev: [
				'src/modules',
				'src/docs',
				'src/index.html',
				'src/css/umobile.css'
			],
			prod: [
				'www/modules',
				'www/docs',
				'www/'
			]
		},

		// Copies assests to public www directory.
		copy: {
			main: {
				files: [
					{
						src: ['**'],
						dest: 'www/data/',
						expand: true,
						cwd: 'src/data/'
					}
				]
			},
			images: {
				files: [
					{
						src: ['**'],
						dest: 'www/images/',
						expand: true,
						cwd: 'src/images/'
					},
					{
						src: ['**'],
						dest: 'www/data/icons/',
						expand: true,
						cwd: 'src/data/icons/'
					},
					{
						src: ['**'],
						dest: 'www/css/lib/jquerymobile/images/',
						expand: true,
						cwd: 'src/css/lib/jquerymobile/images'
					}
				]
			}
		},

		// Compile less files into css.
		less: {
			dev: {
				files: {
					'src/css/umobile.css': 'src/less/umobile.less'
				}
			},
			prod: {
				files: {
					'www/css/umobile.css': 'src/less/umobile.less'
				},
				options: {
					compress: true
				}
			}
		},

		// Minify CSS.
		cssmin: {
			compressCssFiles: {
				files: {
					'www/css/portal.css': ['src/css/portal.css'],
					'www/css/lib/jquerymobile/jqm.theme.css': ['src/css/lib/jquerymobile/jqm.theme.css']
				}
			}
		},

		// Lint settings.
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
				'src/js/src/**/*.js',
				'config/*.js',
				'tasks/*.js',
				'*.js'
			]
		},

		// Compress javascript and copy to www directory.
		uglify: {
			options: {
				compress: true,
				mangle: false,
				preserveComments: false
			},
			lib: {
				files: {
					'www/js/lib/lib.min.js': [
						'src/js/lib/cordova/cordova-' + config.getCordova() + '.js',
						'src/js/lib/jquery/jquery.js',
						'src/js/lib/jquerymobile/jquery-mobile.js',
						'src/js/lib/jquery/jquery-pubsub.js',
						'src/js/lib/gibberish/gibberishAES.js',
						'src/js/lib/underscore/underscore.js',
						'src/js/lib/backbone/backbone.js',
						'src/js/lib/handlebars/handlebars.js',
						'src/js/lib/bootstrap/bootstrap.js'
					]
				}
			},
			source: {
				files: {
					'www/js/src/main.min.js': [
						'src/js/src/config/' + config.getAuth() + '.js',
						'src/js/src/app.js',
						'src/js/src/service/' + config.getTracker() + '.js',
						'src/js/src/service/Authentication.js',
						'src/js/src/service/Storage.js',
						'src/js/src/model/State.js',
						'src/js/src/model/Module.js',
						'src/js/src/model/Credential.js',
						'src/js/src/collection/ModuleCollection.js',
						'src/js/src/view/Module.js',
						'src/js/src/view/Credential.js',
						'src/js/src/view/App.js',
						'src/js/src/umobile.js'
					]
				}
			}
		},

		// Compile html files and copy to target directories.
		compilehtml: {
			devViews: {
				options: {
					cordova: config.getCordova(),
					tracker: config.getTracker(),
					auth: config.getAuth(),
					dev: true
				},
				src: 'views/*.html',
				dest: 'src/FILE.html'
			},
			devModules: {
				options: {
					cordova: config.getCordova(),
					tracker: config.getTracker(),
					auth: config.getAuth(),
					dev: true
				},
				src: 'views/modules/*.html',
				dest: 'src/modules/FILE.html'
			},
			prodViews: {
				options: {
					cordova: config.getCordova(),
					tracker: config.getTracker(),
					auth: config.getAuth(),
					dev: false
				},
				src: 'views/*.html',
				dest: 'www/FILE.html'
			},
			prodModules: {
				options: {
					cordova: config.getCordova(),
					tracker: config.getTracker(),
					auth: config.getAuth(),
					dev: false
				},
				src: 'views/modules/*.html',
				dest: 'www/modules/FILE.html'
			}
		},

		// Append script-based templates to index file.
		appendpartials: {
			options: {
				tag: 'script',
				type: 'text/x-handlebars-template'
			},
			dev: {
				options: {
					layout: 'src/index.html'
				},
				files: {
					'src/index.html': ['views/partials/*.html']
				}
			},
			prod: {
				options: {
					layout: 'www/index.html'
				},
				files: {
					'www/index.html': ['views/partials/*.html']
				}
			}
		}
	});

	// Load plugins/tasks.
	grunt.loadNpmTasks('grunt-contrib');
	grunt.task.loadTasks('tasks');

	// Register tasks.
	grunt.registerTask('dev', [
		'clean:dev',
		'less:dev',
		'cssmin',
		'jshint',
		'compilehtml:devViews',
		'compilehtml:devModules',
		'appendpartials:dev'
	]);

	grunt.registerTask('prod', [
		'clean:prod',
		'copy',
		'less:prod',
		'cssmin',
		'jshint',
		'uglify',
		'compilehtml:prodViews',
		'compilehtml:prodModules',
		'appendpartials:prod'
	]);
};