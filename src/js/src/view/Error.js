/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages message notifications.

	@class Error
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Error = umobile.view.Base.extend({
		/**
		Property houses HTML tag name used to build view.

		@property tagName
		@type String
		**/
		tagName: 'div',

		/**
		Property houses class name that is added to the tagName.

		@property className
		@type String
		**/
		className: 'um-error',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-error'
		}
	});

})(jQuery, _, umobile, config);