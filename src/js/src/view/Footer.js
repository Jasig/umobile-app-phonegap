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
		Property houses the current route.

		@property currentRoute
		@type String
		**/
		currentRoute: null,

		/**
		Method toggles the visibility of the footer.

		@method toggleVisibility
		@param {Object} view The current view.
		**/
		toggleVisibility: function () {
			// Define & initialize.
			var username = this.credModel.get('username');

			// Hide the footer and only show it when on the
			// dashboard and logged in as a guest.
			this.$el.hide();
			if (username && this.currentRoute) {
				if (username === 'guest' && this.currentRoute === 'dashboard') {
					this.$el.show();
				}
			}
		},

		/**
		Method is triggered when a user's credentials are updated.

		@method onCredChanged
		@override Base
		**/
		onCredChanged: function (model) {
			this.toggleVisibility();
		},

		/**
		Method is triggered when the route changes.

		@method onRouteChanged
		@override Base
		**/
		onRouteChanged: function (view) {
			this.currentRoute = view.name;
			this.toggleVisibility();
		}
	});

})(jQuery, _, Backbone, umobile, config);