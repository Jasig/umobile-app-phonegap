/*global require:true */

// Modules.
var config = require('./config');

// Houses common utilty methods.
var utils = {
	// Performs a test on the current environment configuration (i.e., ios, android or web).
	isEnvironment: function (environment) {
		//return (config.environment === environment ) ? true : false;
	},

	// Performs a test on the current auth configuration (i.e., mock, cas or local).
	isConfig: function (authConfig) {
		//return (config.authConfig === authConfig) ? true : false;
	},

	// Performs a test on the current mode configuration (i.e., dev or prod).
	isDevelopment: function () {
		//return (config.mode === 'dev') ? true : false;
	},

	// Returns the destination directory based upon the current mode configuration.
	getDest: function () {
		//return (config.mode === 'dev') ? 'src' : 'www';
	}
};

// Export utils object.
module.exports = utils;