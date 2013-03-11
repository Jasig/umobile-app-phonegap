/*global require:true, __dirname:true, process:true, module:true */

// The purpose of this file is to setup the use of
// configuration files for our node development server.

// Modules & variables.
var nconf = require('nconf'),
	fs = require('fs'),
	config = {};

// Setup nconf to use (in-order) command-line arguments and environment variables.
nconf.argv().env();

// Configure nconf to use config.json file.
nconf.file({file: __dirname + '/config/config.json'});

// Supported environments are web, android and ios.
config.environment = nconf.get('environment') || 'web';

// Supported types are mock, local and cas.
config.authConfig = nconf.get('auth') || 'mock';

// Define cas.js, local.js & mock.js file path.
config.authConfigFile = nconf.get('auth_file_path') + nconf.get('auth') + '.js';

// Supported modes are dev and prod.
config.mode = nconf.get('mode') || 'dev';

// Supported builds are 'dev', 'prod'.
//config.buildEnvironment = nconf.get('build') || 'dev';
config.isDevBuild = function () {
	'use strict';
	return config.mode === 'dev';
};

// Export module.
module.exports = config;