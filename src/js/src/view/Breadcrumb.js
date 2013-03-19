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
	umobile.view.Breadcrumb = umobile.view.BaseView.extend({
		/**
		Root DOM element.

		@property el
		@type Object
		@override BaseView
		**/
		el: '#breadcrumb',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		@override BaseView
		**/
		selectors: {
			template: '#views-partials-breadcrumb'
		},

		/**
		Method toggles the visibility of the breadcrumb view.

		@method toggleVisibility
		@param {Object} view The current view.
		**/
		toggleVisibility: function (view) {
			var visibility = (view.getLoadedViewName() === 'dashboard') ? this.$el.addClass('hidden') : this.$el.removeClass('hidden');
		},

		/**
		Method renders the Breadcrumb template.

		@method render
		@return {Object}
		**/
		render: function () {
			this.$el.html(this.template({}));
			return this;
		},

		/**
		Entry point for the Breadcrumb view.

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

			// Listen for the view.rendered event.
			$.subscribe('view.rendered', _.bind(this.toggleVisibility, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);