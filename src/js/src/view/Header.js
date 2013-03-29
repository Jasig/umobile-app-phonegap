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
			home: '#homeButton',
			login: '#loginButton',
			logout: '#logoutButton'
		},

		/**
		Method toggles the visibility of the header buttons.

		@method toggle
		@param {Object} view Object containing the current view name property.
		**/
		toggle: function (view) {
			// Define.
			var home = this.loc('home'),
				login = this.loc('login');

			switch (view.name) {
			case 'dashboard':
				home.addClass('hidden');
				login.removeClass('hidden');
				break;
			case 'login':
				home.removeClass('hidden');
				login.addClass('hidden');
				break;
			case 'modules':
				home.removeClass('hidden');
				break;
			default:
				home.removeClass('hidden');
				login.removeClass('hidden');
			}
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
			// Call super.
			this._super();

			// Compile view template.
			this.template = Handlebars.compile($(this.selectors.template).html());

			// Render template.
			this.render();

			// Listen for the route.changed event.
			$.subscribe('route.changed', _.bind(this.toggle, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);