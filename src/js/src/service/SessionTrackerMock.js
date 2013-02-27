(function($, umobile, config) {

	// Override config.js to provide mock data
	// and mock login functionality.
	config.uMobileServerContext = "/data";
	config.loginFn = "mockLogin";

	/**
	The SesssionTrackerMock class mocks the in-memory
	implementation of the SessionTracking class.

	@class SessionTrackerMock
	**/
	umobile.SessionTracker = {
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

})(jQuery, umobile, config);