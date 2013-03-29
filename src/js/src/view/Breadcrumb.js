/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the application Breadcrumb.

	@class Breadcrumb
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Breadcrumb = umobile.view.Base.extend({
		/**
		Property houses root DOM element.

		@property el
		@type Object
		@override Base
		**/
		el: '#breadcrumb',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-breadcrumb'
		},

		/**
		Method toggles the visibility of the breadcrumb view.
		Currently disabled since it is not needed.

		@method toggleVisibility
		@param {Object} view The current view.
		**/
		toggleVisibility: function (view) {
			var visibility = (view.name === 'dashboard') ? this.$el.addClass('hidden') : this.$el.removeClass('hidden');
		},

		/**
		Method renders the Breadcrumb template.

		@method render
		@return {Object} Reference to Breadcrumb view.
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

			// Listen for the route.changed event.
			// Disabled. Not currently needed.
			//$.subscribe('route.changed', _.bind(this.toggleVisibility, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);