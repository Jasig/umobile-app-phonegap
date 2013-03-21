/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Module view.

	@class ModuleView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.ModuleView = umobile.view.LoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		**/
		name: 'module',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-moduleview'
		},

		/**
		Method initializes the view.

		@method initialize
		@param {Object} options Options object.
		@override LoadedView
		**/
		initialize: function (options) {
			// Call super.
			this._super(options);
		}
	});

})(jQuery, _, Backbone, umobile, config);