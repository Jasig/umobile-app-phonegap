// Modules.
var nconf = require('nconf'),
	config = require('../config'),
	utils = require('../utils');

// Exports page routes.
module.exports = function (app) {
	// '/' page route.
	app.get('/', function (req, res) {
		res.render('index', {
			pageTitle: 'uMobile || Development',
			locale: 'en-us',
			web: utils.isEnvironment('web'),
			android: utils.isEnvironment('android'),
			ios: utils.isEnvironment('ios'),
			dev: utils.isDevelopment(),
			mock: utils.isConfig('mock'),
			cas: utils.isConfig('cas'),
			local: utils.isConfig('local')
		});
	});
};