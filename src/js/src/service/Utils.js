/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Houses utility methods.

	@class Utils
	@submodule utility
	@namespace utility
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
		@param {Object} object Object to examine for length.
		**/
		getObjectLength: function (object) {
			return _.keys(object).length;
		},

		/**
		Method returns a truncated string.

		@method truncate
		@param {String} str String to be truncated.
		@param {Number} length Allowable length of a string.
		@param {String} suffix Characters appended to truncated string.
		**/
		truncate: function (str, length, suffix) {
			length = (!length) ? 9 : length;
			suffix = (!suffix) ? '...' : suffix;
			return (str.length > length) ? str.substring(0, (length - suffix.length)) + suffix : str;
		},

		/**
		Method returns the contents of a parameter on a url string.

		@method getParameter
		@param {String} param Property to search.
		@param {String} path Url string to examine.
		**/
		getParameter: function (param, path) {
			return path.split(param + '=')[1];
		}

	};

})(jQuery, _, umobile, config);