/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the application Footer.

	@class Header
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Footer = umobile.view.BaseView.extend({
		/**
		Root DOM element.

		@property el
		@type Object
		@override BaseView
		**/
		el: '#footer',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		@override BaseView
		**/
		selectors: {
			template: '#views-partials-footer'
		},

		/**
		Method renders the Footer template.

		@method render
		@return {Object}
		**/
		render: function () {
			this.$el.html(this.template({}));
			return this;
		},

		/**
		Entry point for the Footer view.

		@method initialize
		@override BaseView
		**/
		initialize: function () {
			// Bind all properties and methods.
			_.bindAll(this);

			// Compile view template.
			this.template = Handlebars.compile($(this.selectors.template).html());

			// Render template.
			this.render();
		}
	});

})(jQuery, _, Backbone, umobile, config);