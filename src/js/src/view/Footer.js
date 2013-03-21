/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the application Footer.

	@class Footer
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Footer = umobile.view.Base.extend({
		/**
		Property houses root DOM element.

		@property el
		@type Object
		@override Base
		**/
		el: '#footer',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-footer'
		},

		/**
		Method renders the Footer template.

		@method render
		@return {Object} Reference to Footer view.
		**/
		render: function () {
			this.$el.html(this.template({}));
			return this;
		},

		/**
		Method initializes the view.

		@method initialize
		@override Base
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