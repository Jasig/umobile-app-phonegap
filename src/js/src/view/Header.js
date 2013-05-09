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
			home: '#homeButton',
			login: '#loginButton',
			logout: '#logoutButton'
		},

		/**
		Property houses the current route.

		@property currentRoute
		@type String
		**/
		currentRoute: null,

		/**
		Method manages the visibility of header icons.

		@method toggleHeaderIcons
		**/
		toggleHeaderIcons: function () {
			// Define.
			var username, home, login, logout;

			// Initialize.
			username = this.credModel.get('username');
			home = this.loc('home');
			login = this.loc('login');
			logout = this.loc('logout');

			// Only toggle icons when our credential model
			// contains a valid username.
			if (username) {
				// Toggles the login/logout button.
				// TODO: Implement logout functionality.
				if (username === 'guest') {
					login.removeClass('hidden');
					logout.addClass('hidden');
				} else {
					login.removeClass('hidden');
					logout.addClass('hidden');
				}

				console.log(this.currentRoute);
				switch (this.currentRoute) {
				case 'dashboard':
					home.addClass('hidden');
					break;
				case 'login':
					home.removeClass('hidden');
					break;
				case 'modules':
					home.removeClass('hidden');
					break;
				}
			}
		},

		/**
		Method is triggered when a user's credentials are updated.

		@method onCredChanged
		@override Base
		**/
		onCredChanged: function () {
			this.toggleHeaderIcons();
		},

		/**
		Method is triggered when the route changes.

		@method onRouteChanged
		@override Base
		**/
		onRouteChanged: function (view) {
			this.currentRoute = view.name;
			this.toggleHeaderIcons();
		}
	});

})(jQuery, _, Backbone, umobile, config);