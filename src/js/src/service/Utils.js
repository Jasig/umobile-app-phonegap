/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	...

	@class Utils
	@submodule session
	@namespace session
	**/
	umobile.utility.Utils = {

		/**
		@method getTimestamp
		**/
		getTimestamp: function () {
			return new Date().getTime();
		},

		/**
		@method getObjectLength
		**/
		getObjectLength: function (object) {
			return _.keys(object).length;
		}

	};

})(jQuery, _, umobile, config);