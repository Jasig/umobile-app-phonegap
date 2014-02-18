/*global require:true, __dirname:true, process:true, console:true, module:true */

// The purpose of this file is to setup the use of
// configuration files for our node development server.

// Modules & Variables.
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
config.auth = nconf.get('auth') || 'mock';

// Supported modes are dev and prod.
config.mode = nconf.get('mode') || 'dev';

// Phonegap plugins
config.plugins = nconf.get('plugins') || [];

config.beautify = nconf.get('beautify') || true;

// Performs a test on the current mode configuration
// (i.e., dev or prod).
config.isDevelopment = function () {
	'use strict';
	return (config.mode === 'dev') ? true : false;
};

// Returns the authentication configuration.
config.getAuth = function () {
	'use strict';
	return config.auth;
};

// Returns the environment configuration.
config.getEnvironment = function () {
	'use strict';
	return config.environment;
};

// Returns the SessionTracker needed
// based upon the environment configuration.
// The session tracker plugin is currently
// disabled with our upgrade to PhoneGap 2.5.
// This method always returns SessionTrackerMock
// until the session tracking plugins can be upgraded.
config.getTracker = function () {
	'use strict';
	return (config.getEnvironment() !== 'web') ? 'SessionTracker' : 'SessionTrackerMock';
};

// Returns the cordova version needed
// based upon the environment configuration.
config.getCordova = function () {
	'use strict';
	var theEnv = config.getEnvironment();
	return (theEnv === 'web' || theEnv === 'android') ? 'android' : 'ios';
};

// Returns the public directory based upon
// the mode configuration.
config.getPublicDirectory = function () {
	'use strict';
	return 'www';
};

config.getOptionsForLess = function() {
	var options = {
		compress: config.isDevelopment() ? false : true,
		cleancss: config.isDevelopment() ? false : true,
		report: config.isDevelopment() ? 'min' : 'gzip',
		optimization: config.isDevelopment() ? 1 : 5,
	}
	return options;
};

// Export module.
module.exports = config;