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
	umobile.view.Header = umobile.view.Base.extend({
		/**
		Property houses the root DOM element.

		@property el
		@type Object
		@override Base
		**/
		el: '#header',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-header',
			loginButton: '#loginButton'
		},

		/**
		Method toggles the visibility of the login button.

		@method toggleLogin
		@param {Object} view Object containing the current view name property.
		**/
		toggleLogin: function (view) {
			var loginButton, login;
			loginButton = this.loc('loginButton');
			login = (view.name === 'login') ? loginButton.addClass('hidden') : loginButton.removeClass('hidden');
		},

		/**
		Method renders the Header template.

		@method render
		@return {Object} Reference to the Header view.
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
			$.subscribe('route.changed', _.bind(this.toggleLogin, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);