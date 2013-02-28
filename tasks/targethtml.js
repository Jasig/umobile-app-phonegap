/*global exports:true, module:true, require:true */

// Modules.
var config = require('../config');

module.exports = function (grunt) {
	'use strict';

	grunt.registerMultiTask('targethtml', 'Produces html-output depending on grunt release version', function () {
		// Define.
		var files, invalidSrc, target;

		// The source files to be processed. The "nonull" option is used
		// to retain invalid files/patterns so they can be warned about.
		files = grunt.file.expand({ nonull: true }, this.files[0].src);

		// Warn if a source file/pattern was invalid.
		invalidSrc = files.some(function (filepath) {
			if (!grunt.file.exists(filepath)) {
				grunt.log.error('Source file "' + filepath + '" not found.');
				return true;
			}
		});
		if (invalidSrc) {
			return false;
		}

		target = config.targetEnvironment;

		// Process files.
		files.forEach(function (filepath) {
			grunt.log.ok('Processing HTML file ' + filepath);
			var contents = grunt.file.read(filepath);

			if (contents) {
				contents = contents.replace(new RegExp('<!--[\\[\\(]if target ' + target + '[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), '$2');
				contents = contents.replace(new RegExp('^[\\s\\t]+<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'gm'), '');
				contents = contents.replace(new RegExp('<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'g'), '');
				grunt.file.write(this.files[0].dest, contents);
			}
		}.bind(this));

		// Fail task if errors were logged.
		if (this.errorCount) {
			return false;
		}

		// Otherwise, print a success message.
		grunt.log.ok('File "' + this.files[0].dest + '" created');
	});
};