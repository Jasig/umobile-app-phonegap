/*jshint es5:true */
/*global require:true, __dirname:true, console:true, process:true, setTimeout:true */

// Modules & Variables.
var express = require('express'),
	http = require('http'),
	path = require('path'),
	app;

// Express configuration.
app = express();

// All server configurations.
app.configure(function () {
	'use strict';
	// settings.
	app.set('port', 5000);

	// middleware.
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.errorHandler());
	app.use(express.static(path.join(__dirname, 'src')));
});

// Startup.
http.createServer(app).listen(app.get('port'), function () {
	'use strict';
	console.log('Express server listening on port ' + app.get('port'));
});