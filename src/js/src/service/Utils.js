/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Houses utility methods.

	@class Utils
	@submodule session
	@namespace session
	**/
	umobile.utility.Utils = {

		/**
		Method returns the current timestamp.

		@method getTimestamp
		**/
		getTimestamp: function () {
			return new Date().getTime();
		},

		/**
		Method returns the length of an object.

		@method getObjectLength
		**/
		getObjectLength: function (object) {
			return _.keys(object).length;
		},

		/**
		Method returns a truncated string.

		@method truncate
		**/
		truncate: function (str, length, suffix) {
			length = (!length) ? 9 : length;
			suffix = (!suffix) ? '...' : suffix;
			return (str.length > length) ? str.substring(0, (length - suffix.length)) + suffix : str;
		},

		/**
		Method returns the contents of a parameter on a url string.

		@method getParameter
		**/
		getParameter: function (param, path) {
			return path.split(param + '=')[1];
		}

	};

})(jQuery, _, umobile, config);