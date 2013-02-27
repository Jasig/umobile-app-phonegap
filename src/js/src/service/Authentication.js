/*global window:true, document:true, jQuery:true, umobile:true, config:true, GibberishAES:true, console:true */
(function ($, umobile, config) {
	'use strict';

	/**
	Manages authentication process for the umobile application.

	@class Authentication
	@submodule auth
	@namespace auth
	**/
	umobile.auth = umobile.auth || {};

	/**
	Method returns local login servlet url.

	@method getLocalLoginServletUrl
	@return {String} local login servlet url.
	@private
	**/
	var getLocalLoginServletUrl = function () {
		return config.uMobileServerUrl + config.uMobileServerContext + '/Login';
	};

	/**
	Method returns local logout servlet url.

	@method getLocalLoginServletUrl
	@return {String} local logout servlet url.
	@private
	**/
	var getLocalLogoutServletUrl = function () {
		return config.uMobileServerUrl + config.uMobileServerContext + '/Logout';
	};

	/**
	Method stores user credentials in local storage.

	@method storeCredentials
	@param {Object} credentials Object hash containing user credentials.
	**/
	umobile.auth.storeCredentials = function (credentials) {
		// Define.
		var username, password;

		// Initialize & encrypt.
		username = GibberishAES.enc(credentials.username, config.encryptionKey);
		password = GibberishAES.enc(credentials.password, config.encryptionKey);

		// Persist in local storage.
		window.localStorage.setItem('username', username);
		window.localStorage.setItem('password', password);
	};

	/**
	Method retrieves user credentials from local storage.

	@method retrieveCredentials
	**/
	umobile.auth.retrieveCredentials = function () {
		// Define.
		var encUsername, encPassword, username, password, credentials;

		// Initialize & retrieve from local storage.
		encUsername = window.localStorage.getItem('username');
		encPassword = window.localStorage.getItem('password');

		// TODO: Double check this logic. The username and password variables are
		// undefined so they will equate to false.
		if (username && password) {
			username = GibberishAES.dec(credentials.encUsername, config.encryptionKey);
			password = GibberishAES.dec(credentials.encPassword, config.encryptionKey);
			return { username: username, password: password };
		} else {
			console.log('No credentials found for user');
			return null;
		}
	};

	/**
	Method mocks the login process for development purposes.

	@method mockLogin
	@param {Object} credentials Object hash containing user credentials.
	@param {Function} onSuccess Handler for successful operation.
	@param {Function} onError Handler for unsucssessful operation.
	**/
	umobile.auth.mockLogin = function (credentials, onSuccess, onError) {
		// Define.
		var data, url;

		// If credentials are included, add them to the POST data.
		if (credentials && credentials.get('username') && credentials.get('password')) {
			url = config.uMobileServerUrl + config.uMobileServerContext + '/layout-student.json';
			console.log('Attempting local login via URL ' + url);
		} else {
			url = config.uMobileServerUrl + config.uMobileServerContext + '/layout-guest.json';
			console.log('Establishing guest session via URL ' + url);
		}

		// Request to uMobile login servlet.
		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			success: function (data, textStatus, jqXHR) {
				if (!credentials || !credentials.attributes.username) {
					console.log('Established guest session.');
					onSuccess(data);
				} else if (credentials.attributes.username === data.user) {
					console.log('Successful authentication for user ' + credentials.attributes.username);
					onSuccess(data);
				} else {
					console.log('Error performing local authentication: ' + textStatus);
					onError(jqXHR, 'Auth failure');
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log('Error performing local authentication: ' + textStatus + ', ' + errorThrown);
				onError(jqXHR, textStatus, errorThrown);
			}
		});
	};

	/**
	Method performs authentication through the uMobile application server
	local authentication controller.

	@method localLogin
	@param {Object} credentials Object hash containing user credentials.
	@param {Function} onSuccess Handler for successful operation.
	@param {Function} onError Handler for unsucssessful operation.
	**/
	umobile.auth.localLogin = function (credentials, onSuccess, onError) {
		// Define.
		var data, url;

		data = {refUrl: config.uMobileServerContext + '/layout.json'};
		url = getLocalLoginServletUrl();

		// If credentials are included, add them to the POST data.
		if (credentials && credentials.get('username') && credentials.get('password')) {
			data.userName = credentials.attributes.username;
			data.password = credentials.attributes.password;
			console.log('Attempting local login via URL ' + url);
		} else {
			console.log('Establishing guest session via URL ' + url);
		}

		// POST to the uMobile login servlet
		$.ajax({
			url: getLocalLoginServletUrl(),
			data: data,
			dataType: 'json',
			type: 'POST',
			success: function (data, textStatus, jqXHR) {
				if (!credentials || !credentials.attributes.username) {
					console.log('Established guest session');
					onSuccess(data);
				} else if (credentials.attributes.username === data.user) {
					console.log('Successful authentication for user ' + credentials.attributes.username);
					onSuccess(data);
				} else {
					console.log('Error performing local authentication: ' + textStatus);
					onError(jqXHR, 'Auth failure');
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log('Error performing local authentication: ' + textStatus + ', ' + errorThrown);
				onError(jqXHR, textStatus, errorThrown);
			}
		});
	};

	/**
	Method performs CAS authentication.

	@method casLogin
	@param {Object} credentials Object hash containing user credentials.
	@param {Function} onSuccess Handler for successful operation.
	@param {Function} onError Handler for unsucssessful operation.
	**/
	umobile.auth.casLogin = function (credentials, onSuccess, onError) {
		// Define.
		var casUrl, serviceUrl;

		// When credentials are false, fall back to local login.
		if (!credentials || !credentials.get('username') || !credentials.get('password')) {
			return umobile.auth.localLogin(credentials, onSuccess, onError);
		}

		// Initialize & define url paths.
		casUrl = config.casServerUrl + '/cas/login';
		serviceUrl = getLocalLoginServletUrl() + '?refUrl=' + config.uMobileServerContext + '/layout.json';
		console.log('Attempting CAS authentication to URL ' + casUrl + ' using serviceUrl ' + serviceUrl);

		// Request to the uMobile login servlet.
		$.ajax({
			url: casUrl,
			data: {service: serviceUrl},
			dataType: 'html',
			type: 'GET',
			success: function (html, textStatus, jqXHR) {
				// Define.
				var flowRegex, executionRegex, flowId, executionId, data;

				// If this doesn't look like the CAS login form, we already
				// have a CAS session and were directed straight to uMobile.
				if (html.indexOf('name="lt"') === -1) {
					data = $.parseJSON(html);
					if (!credentials || credentials.attributes.username === data.user) {
						onSuccess(data);
					} else {
						console.log('Error parsing layout JSON response.');
						onError(jqXHR, 'Auth failure');
					}
				} else { // Otherwise submit the user's credentials.
					flowRegex = /input type="hidden" name="lt" value="([a-z0-9\-]*)?"/i;
					executionRegex = /input type="hidden" name="execution" value="([a-z0-9\-]*)?"/i;
					flowId = flowRegex.exec(html)[1];
					executionId = executionRegex.exec(html)[1];

					console.log('Submitting user credentials to CAS.');
					$.ajax({
						url: casUrl,
						data: {
							service: serviceUrl,
							username: credentials.attributes.username,
							password: credentials.attributes.password,
							lt: flowId,
							execution: executionId,
							_eventId: 'submit',
							submit: 'LOGIN'
						},
						dataType: 'json',
						type: 'POST',
						success: function (data, textStatus, jqXHR) {
							if (!credentials || credentials.attributes.username === data.user) {
								onSuccess(data);
							} else {
								console.log('Error parsing layout JSON response' + textStatus);
								onError(jqXHR, 'Auth failure');
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log('Error submitting CAS credentials: ' + textStatus + ', ' + errorThrown);
							return umobile.auth.localLogin(credentials, onSuccess, onError);
						}
					});
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log('Error accessing CAS login page: ' + textStatus + ', ' + errorThrown);
				onError(jqXHR, textStatus, errorThrown);
			}
		});
	};

	/**
	Method logs the current user out of the application and attempts
	to reauthenticate based upon the given credentials parameter.

	@method switchuser
	@param {Object} credentials Object hash containing user credentials.
	@param {Function} onSuccess Handler for successful operation.
	@param {Function} onError Handler for unsucssessful operation.
	**/
	umobile.auth.switchuser = function (credentials, onSuccess, onError) {
		// Define.
		var logoutUrl = getLocalLogoutServletUrl();

		console.log('Logging out via URL ' + logoutUrl);
		$.ajax({
			url: logoutUrl,
			success: function (html, textStatus, jqXHR) {
				umobile.auth[config.loginFn](credentials, onSuccess, onError);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log('Error logging out: ' + textStatus + ', ' + errorThrown);
				onError(jqXHR, textStatus, errorThrown);
			},
			dataType: 'html',
			type: 'GET'
		});
	};

})(jQuery, umobile, config);