/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	...

	@class Home
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Home = umobile.view.Screen.extend({
		/**
		Object hash of valid DOM selectors for
		the Home screen.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-home'
		}
	});

})(jQuery, _, Backbone, umobile, config);