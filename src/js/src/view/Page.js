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
	umobile.view.Page = umobile.view.BaseView.extend({
		/**
		Root DOM element.

		@property el
		@type Object
		@override BaseView
		**/
		el: '#page',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		@override BaseView
		**/
		selectors: {
			template: '#views-partials-page',
			header: '#header',
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
		},

		/**
		Method renders header, content and footer.

		@method render
		@return {Object}
		**/
		render: function () {
			// Render base page.
			this.$el.html(this.template({}));

			// Render the header.
			this.renderHeader();

			// Render the footer.
			this.renderFooter();

			return this;
		},

		/**
		Entry point for the view.

		@method initialize
		@override BaseView
		**/
		initialize: function () {
			// Bind all properties and methods.
			_.bindAll(this);

			// Compile screen template.
			this.template = Handlebars.compile($(this.selectors.template).html());

			// Render template.
			this.render();
		}
	});

})(jQuery, _, Backbone, umobile, config);