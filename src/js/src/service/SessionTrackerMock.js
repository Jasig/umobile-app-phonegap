/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The SesssionTrackerMock class mocks the in-memory
	implementation of the SessionTracking class.

	@class SessionTrackerMock
	@submodule session
	@namespace session
	**/
	umobile.session.SessionTracker = {
		/**
		@property time
		**/
		time: 0,

		/**
		@method get
		**/
		get: function (success) {
			if (typeof success !== 'function') {
				throw new Error('The success parameter must be a function, was ' + typeof success + '.');
			}
			success(this.time);
		},

		/**
		@method set
		**/
		set: function (time, success, failure) {
			this.time = time;
			if (success) {
				success(time);
			}
		}
	};

})(jQuery, _, umobile, config);