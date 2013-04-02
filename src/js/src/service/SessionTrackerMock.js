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
		Property houses the current timestamp.

		@property time
		**/
		time: 0,

		/**
		Method executes the passed success method with
		the current timestamp.

		@method get
		@param {Function} success Success callback.
		**/
		get: function (success) {
			success(this.time);
		},

		/**
		Method sets the timestamp and calls the passed
		success method when present.

		@method set
		@param {Number} time Timestamp to be stored.
		@param {Function} success Success callback.
		@param {Function} failure Error callback.
		**/
		set: function (time, success, failure) {
			this.time = time;
			if (success) {
				success(time);
			}
		}
	};

})(jQuery, _, umobile, config);