/*global require:true, __dirname:true, process:true, module:true */

// The purpose of this file is to setup the use
// of a configuration file for our node development server.

// Modules.
var nconf = require('nconf'),
    fs = require('fs');

// Configuration object.
var config = {};

// Setup nconf to use (in-order) command-line arguments and environment variables.
nconf.argv().env();

// Define configuration path.
config.path = __dirname + '/config';

// Define config.json file path.
config.configFile = config.path + '/config.json';

// Setup nconf to use config.json file.
nconf.file({file: config.configFile});

/** Supported environments are: 'web', 'android', 'iphone' **/
config.targetEnvironment = nconf.get('environment') || 'web';

/** Configuration type to be used. Supported types are 'mock', 'local', 'cas' **/
config.configSettings = nconf.get('config') || 'mock';

/** Supported builds are 'dev', 'prod' **/
config.buildEnvironment = nconf.get('build') || 'dev';

config.isDevBuild = function () {
	'use strict';
	return config.buildEnvironment === 'dev';
};

// Export module.
module.exports = config;