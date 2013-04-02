/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, cordova:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Gets and sets the last accessed timestamp for the current session.
	This plugin has been temporarily disabled with the latest upgrade to
	PhoneGap 2.5.

	@class SessionTracker
	@submodule session
	@namespace session
	**/
	umobile.session.SessionTracker = {
		get: function (success, failure) {
			return cordova.exec(success, failure, 'SessionTracking', 'get', []);
		},
		set: function (time, success, failure) {
			return cordova.exec(success, failure, 'SessionTracking', 'set', [time]);
		}
	};

})(jQuery, _, umobile, config);