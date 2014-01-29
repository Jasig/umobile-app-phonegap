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

// Server location.
config.external = nconf.get('external');

//Phonegap platoforms
config.platforms = nconf.get('platforms') || 'android';


//Phonegap plugins.
config.plugins = nconf.get('plugins') || [];

// Performs a test on the current environment configuration.
// (i.e., ios, android or web).
config.isEnvironment = function (environment) {
	'use strict';
	return (config.environment === environment) ? true : false;
};

// Performs a test on the current auth configuration
// (i.e., mock, cas or local).
config.isAuthConfig = function (auth) {
	'use strict';
	return (config.auth === auth) ? true : false;
};

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
	return (config.environment !== 'web') ? 'SessionTrackerMock' : 'SessionTrackerMock';
};

// Returns the cordova version needed
// based upon the environment configuration.
config.getCordova = function () {
	'use strict';
	return (config.environment === 'web' || config.environment === 'android') ? 'android' : 'ios';
};

// Returns the public directory based upon
// the mode configuration.
config.getPublicDirectory = function () {
	'use strict';
	return (config.mode === 'dev') ? 'src' : 'www';
};

// Returns server path for the webapp location.
config.getExternal = function () {
	'use strict';
	return (config.external) ? config.external : null;
};

// Export module.
module.exports = config;