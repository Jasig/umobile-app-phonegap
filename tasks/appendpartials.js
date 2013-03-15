/*global exports:true, module:true, require:true */

/*
 * grunt-append-templates
 * https://github.com/samjoch/grunt-append-templates
 *
 * Copyright (c) 2013 Sam Joch
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
	'use strict';

	// Please see the grunt documentation for more information regarding task
	// creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md
	grunt.registerMultiTask('appendpartials', 'Append script templates to html.', function () {

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			tag: 'script',
			type: 'text/x-template',
			layout: 'app/templates/layout.html'
		});

		// Iterate over all specified file groups.
		this.files.forEach(function (fileObj) {
			// The source files to be concatenated. The "nonull" option is used
			// to retain invalid files/patterns so they can be warned about.
			var files = grunt.file.expand({nonull: true}, fileObj.src);
			var appendedFiles = [];

			// Concat specified files.
			var scripts = files.map(function (filepath) {
				// Prevent append layout
				if (filepath.indexOf('layout') > 0) {
					return '';
				}

				// Warn if a source file/pattern was invalid.
				if (!grunt.file.exists(filepath)) {
					grunt.log.error('Source file "' + filepath + '" not found.');
					return '';
				}
				// Read file source.
				var attrs = { type: options.type };
				attrs.id = filepath.split('.')[0].replace(/\//g, '-');
				var chunk = '  <' + options.tag + ' type="' + attrs.type + '" id="' + attrs.id + '">\n';
				chunk += '    ' + grunt.file.read(filepath).replace(/\n/g, '\n    ');
				chunk += '\n  </' + options.tag + '>';
				appendedFiles.push(filepath);

				return chunk;
			}).join('\n') + '\n';

			// Handle options.
			var insert = function (text, element, insertion) {
				var pos = text.indexOf(element);
				return [text.slice(0, pos), insertion, text.slice(pos)].join('');
			};

			// Insert before body in the destination file.
			var dest = grunt.file.read(options.layout);
			dest = insert(dest, '</templates>', scripts);
			grunt.file.write(fileObj.dest, dest);

			// Print a success message.
			appendedFiles.forEach(function (path) {
				grunt.log.writeln('File ' + path + ' appended layout.');
			});
		});
	});
};