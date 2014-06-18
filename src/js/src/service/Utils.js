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
		},
		/**
		Method injects a script tag into the DOM above all the other scripts on the page.
		This will be used instead of using eval on scripts since scripts dynamically added
		to the DOM get executed automatically.

		@method loadScript
		@param  {string}   url      URL of the script that you want to inject into the DOM
		@param  {Function} callback Call back that you want called once the script is in the DOM
		**/
		loadScript: function (url, callback) {
			// Define vars
			var script, entry;

			script = document.createElement('script');
			script.ascync = true;
			script.src = url;
			
			entry = document.getElementsByTagName('script')[0];
			entry.parentNode.insertBefore(script, entry);
			script.onload = script.onreadystatechange = function () {
				var rdyState = script.readyState;
				if (!rdyState || /complete|loaded/.test(script.readyState)) {
					callback();
					script.onload = null;
					script.onreadystatechange = null;
				}
			};
		},


		/**
		 * Method switchs lang and realod the current view
		 * 
		 * @param  {String} lang : property houses the lang to switch to.
		 * @method switchLang
		 */
		switchLang : function(lang) {

			umobile.i18n.clear();
			umobile.i18n.locale(lang);
			
			$.get(config.messages[umobile.i18n.locale()]).done(function(data) {
				umobile.i18n.extend(data);

				var currentView = umobile.app.stateModel.get('currentView');
				umobile.app.router[currentView]();
			});
			umobile.app.stateModel.save({ lang : lang });
		}

	};

})(jQuery, _, umobile, config);