/*global exports:true, module:true, require:true */

// Modules & variables.
var nconf = require('nconf'),
	config = require('./config'),
	utils = require('./utils'),
	setup, clean, copy, images, css, lint,
	javascript, html, tearDown, taskList;

// Grunt.
module.exports = function (grunt) {
	'use strict';
	
};