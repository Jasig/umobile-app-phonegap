/*global exports:true, module:true, require:true */
module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		// Linting.
		jshint: {
			all: [
				'www/js/src/**/*.js',
				'www/js/test/**/*.js',
				'*.js'
			],
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
				indent: true
			},
			global: {
				define: true,
				window: true,
				document: true
			}
		}
	});

	// Load plugins/tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Register tasks.
	grunt.registerTask('default', 'jshint');
};