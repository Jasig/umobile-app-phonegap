/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Responsible for rendering out a basic page layout,
	which consists of the header, content and footer.

	@class Page
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Page = umobile.view.Base.extend({
		/**
		Property houses the root DOM element.

		@property el
		@type Object
		@override Base
		**/
		el: '#page',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-page',
			header: '#header',
			breadcrumb: '#breadcrumb',
			background: '#background',
			footer: '#footer'
		},

		/**
		Method initializes the Header view.

		@method renderHeader
		**/
		renderHeader: function () {
			// Define.
			var header, headerView;

			// Initialize.
			header = this.loc('header').html('');
			headerView = new umobile.view.Header();
			headerView.render();
		},

		/**
		Method initializes the Breadcrumb view.

		@method renderBreadcrumb
		**/
		renderBreadcrumb: function () {
			// Define.
			var breadcrumb, breadcrumbView;

			// Initialize.
			breadcrumb = this.loc('breadcrumb').html('');
			breadcrumbView = new umobile.view.Breadcrumb();
			breadcrumbView.render();
		},

		/**
		Method initializes the Background view.
		@method renderBackground
		**/
		renderBackground: function () {
			// Define.
			var background, backgroundView;
			// Initialize.
			background = this.loc('background').html('');
			backgroundView = new umobile.view.Background();
			backgroundView.render();
		},
		/**
		Method initializes the Footer view.

		@method renderFooter
		**/
		renderFooter: function () {
			// Define.
			var footer, footerView;

			// Initialize.
			footer = this.loc('footer').html('');
			footerView = new umobile.view.Footer();
			footerView.render();
		},

		/**
		Method renders header, content and footer.

		@method render
		@return {Object} Reference to the Page view.
		@override Base
		**/
		render: function () {
			// Render base page.
			this.$el.html(this.template(this.options));

			// Render the header.
			this.renderHeader();

			// Render the breadcrumb.
			this.renderBreadcrumb();

			// Render the background.
			this.renderBackground();

			// Render the footer.
			this.renderFooter();

			return this;
		}
	});

})(jQuery, _, Backbone, umobile, config);