/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the application Header.

	@class Header
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Header = umobile.view.BaseView.extend({
		/**
		Root DOM element.

		@property el
		@type Object
		@override BaseView
		**/
		el: '#header',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		@override BaseView
		**/
		selectors: {
			template: '#views-partials-header',
			loginButton: '#loginButton'
		},

		/**
		Method toggles the visibility of the login button.

		@method toggleLogin
		@param {Object} view The current view.
		**/
		toggleLogin: function (view) {
			var loginButton = this.loc('loginButton');
			(view.name === 'login') ? loginButton.addClass('hidden') : loginButton.removeClass('hidden');
		},

		/**
		Method renders the Header template.

		@method render
		@return {Object}
		**/
		render: function () {
			this.$el.html(this.template({}));
			return this;
		},

		/**
		Entry point for the Header view.

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
			$.subscribe('view.rendered', _.bind(this.toggleLogin, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);