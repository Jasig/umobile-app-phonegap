/*global exports:true, module:true, require:true */

// Modules & variables.
var nconf = require('nconf'),
	config = require('./config');

// Grunt.
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		phonegap: {
			config: {
			 	root: 'www',
				config: 'config/config.xml',
				cordova: '.cordova',
				path: 'phonegap',
				plugins: config.plugins,
				platforms: function() {
					var platformsUsed = [];
					platformsUsed[0] = config.getCordova();
					return platformsUsed;
				},
				
				maxBuffer: 500, // You may need to raise this for iOS.
				verbose: true,
				releases: 'releases',
				releaseName: function() {
					return (pkg.name + '-' + pkg.version);
				},

				// Must be set for ios to work.
				// Should return the app name.
				name: function() {
					return pkg.name;
				},

				// Android-only integer version to increase with each release.
				// See http://developer.android.com/tools/publishing/versioning.html
				versionCode: function() { return(1) },

				// Android-only options that will override the defaults set by Phonegap in the
				// generated AndroidManifest.xml
				// See https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
				minSdkVersion: function() { return(10) },
				targetSdkVersion: function() { return(19) }
			}
	  	},

		// Cleans out directories.
		clean: {
			all: [
				'src/index.html',
				'www',
				'phonegap'
			]
		},

		// Copies assests.
		copy: {
			all: {
				files: [
					{
						src: ['**'],
						dest: 'www/data/',
						expand: true,
						cwd: 'src/data/'
					},
					{
						src: ['**'],
						dest: 'www/images/',
						expand: true,
						cwd: 'src/images/'
					}
				]
			}
		},

		// Compile less files into css.
		less: {
			all: {
				files: {
					'www/css/umobile.css': 'src/less/umobile.less',
					'www/css/module.css': 'src/less/module.less'
				},
				options: config.getOptionsForLess()
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
				expr: true,
				quotmark: true,
				'-W015': true,
				'-W033': true,
				'-W117': true,
				'-W099': true
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
				compress: false,
				mangle: false,
				preserveComments: false,
				beautify: config.beautify
			},
			lib: {
				files: {
					'www/js/lib/jquery/jquery.min.js': ['src/js/lib/jquery/jquery.js'],
					'www/js/lib/jquery/jquery-pubsub.min.js': ['src/js/lib/jquery/jquery-pubsub.js'],
					'www/js/lib/gibberish/gibberishAES.min.js': ['src/js/lib/gibberish/gibberishAES.js'],
					'www/js/lib/underscore/underscore.min.js': ['src/js/lib/underscore/underscore.js'],
					'www/js/lib/backbone/backbone.min.js': ['src/js/lib/backbone/backbone.js'],
					'www/js/lib/backbone/backbone-super.min.js': ['src/js/lib/backbone/backbone-super.js'],
					'www/js/lib/backbone/backbone-validation.min.js': ['src/js/lib/backbone/backbone-validation.js'],
					'www/js/lib/handlebars/handlebars.min.js': ['src/js/lib/handlebars/handlebars.js'],
					'www/js/lib/bootstrap/bootstrap.min.js': ['src/js/lib/bootstrap/bootstrap.js'],
					'www/js/lib/debug/debug.min.js': ['src/js/lib/debug/debug.js'],

					'www/js/src/main.min.js': [
						'src/js/src/config/' + config.getAuth() + '.js',

						'src/js/src/app.js',
						'src/js/src/router.js',

						'src/js/src/service/Utils.js',
						'src/js/src/service/' + config.getTracker() + '.js',
						'src/js/src/service/Authentication.js',
						'src/js/src/service/Storage.js',

						'src/js/src/model/State.js',
						'src/js/src/model/Module.js',
						'src/js/src/model/Credential.js',
						'src/js/src/model/Notifier.js',

						'src/js/src/resource/Background.js',

						'src/js/src/collection/ModuleCollection.js',

						
						'src/js/src/view/ViewManager.js',
						'src/js/src/view/Base.js',
						'src/js/src/view/Background.js',
						'src/js/src/view/Page.js',
						'src/js/src/view/Breadcrumb.js',
						'src/js/src/view/Header.js',
						'src/js/src/view/Footer.js',
						'src/js/src/view/LoadedView.js',
						'src/js/src/view/DashboardView.js',
						'src/js/src/view/LoginView.js',
						'src/js/src/view/Module.js',
						'src/js/src/view/ModuleView.js',
						'src/js/src/view/Notifier.js'
						
					]
				}
			}
		},

		targethtml: {
			web: {
				files: {
			      'www/index.html': 'views/index.html'
			    }
			},
			phonegap: {
				files: {
			      'www/index.html': 'views/index.html'
			    }
			}
		},

		// Compile html files and copy to target directories.
		compilehtml: {
			modules: {
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
			all: {
				options: {
					layout: 'www/index.html'
				},
				files: {
					'www/index.html': ['views/partials/*.html']
				}
			}
		},

		yuidoc: {
			all: {
				name: '<%= pkg.name %>',
				options: {
					paths: 'src/js/src/',
					outdir: 'www/docs/'
				}
			}
		},

		watch: {
			dev: {
				files: [
					'views/*.html',
					'views/modules/*.html',
					'views/partials/*.html',
					'src/less/**'
				],
				tasks: [
					'compilehtml',
					'appendpartials',
					'less'
				]
			}
		}
	});

	// Load plugins/tasks.
	grunt.loadNpmTasks('grunt-phonegap');
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.task.loadTasks('tasks');

	grunt.option('force', true);

	// Register tasks.

	// Template watch command. Listens for changes
	// to templates and outputs changes to the /src
	// directory.
	grunt.registerTask('watcher', ['watch:dev']);

	// Documentation command. Outputs documentation
	// to /docs.
	grunt.registerTask('docs', ['yuidoc']);

	// Build command for development code.
	// Pushes code to /src directory.
	grunt.registerTask('default', [
		'clean',
		'copy',
		'less',
		'jshint',
		'uglify',
		'targethtml:web',
		'compilehtml',
		'appendpartials',
		'yuidoc'
	]);

	// Prepare a phonegap project
	// based on dev settings
	grunt.registerTask('phonegap', [
		'clean',
		'copy',
		'less',
		'jshint',
		'uglify',
		'targethtml:phonegap',
		'compilehtml',
		'appendpartials',
		'yuidoc',
		'phonegap:build'
	]);
};