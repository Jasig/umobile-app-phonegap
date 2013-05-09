/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages message notifications.

	@class Notifier
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Notifier = umobile.view.Base.extend({
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
		className: 'um-notifier well',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-notifier'
		}
	});

})(jQuery, _, umobile, config);