/*global window:true, jQuery:true, _:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages Session information.

	@class Session
	**/
	umobile.Session = {

		/**
		Method logs a user into the system with the configured login
		function. Data pertaining to a user and thier layout is made
		available when successful.

		@method getSession
		**/
		getSession: function () {
			var loginFn = umobile.auth[config.loginFn];
			loginFn(
				umobile.app.credModel,
				_.bind(function (data) {
					console.log("Broadcasting data for user: " + data.user);
					$.publish('session.retrieved', data);
				}, this),
				_.bind(function (jqXHR, textStatus, errorThrown) {
					console.log('Error: ' + textStatus + ', ' + errorThrown);
				}, this)
			);
		}
	};

})(jQuery, _, umobile, config);