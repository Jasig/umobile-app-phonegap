/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */

(function ($, _, umobile, config) {
	'use strict';

	// Override config.js to provide mock data
	// and mock login functionality.
	config.uMobileServerContext = '/data';
	config.loginFn = 'mockLogin';

	/**
	The SesssionTrackerMock class mocks the in-memory
	implementation of the SessionTracking class.

	@class SessionTrackerMock
	**/
	umobile.session.SessionTracker = {
		time: 0,
		get: function (success) {
			if (typeof success !== 'function') {
				throw new Error('The success parameter must be a function, was ' + typeof success + '.');
			}
			success(this.time);
		},
		set: function (time, success, failure) {
			this.time = time;
			if (success) {
				success(time);
			}
		}
	};

})(jQuery, _, umobile, config);