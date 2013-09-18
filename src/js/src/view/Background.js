/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the application Background.

	@class Background
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Background = umobile.view.Base.extend({
		/**
		Property houses root DOM element.

		@property el
		@type Object
		@override Base
		**/
		el: '#background',

		/**
		Property houses the current route.

		@property currentRoute
		@type String
		**/
		currentRoute: null,

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-background'
		},

		/**
		This method hides the background chooser button by default and only shows
		it when on the dashboard view.
		@return none
		**/
		toggleVisibility: function () {
			this.$el.hide();
			if (this.currentRoute) {
				if (this.currentRoute === 'dashboard') {
					this.$el.show();
				}
			}
		},

		/**
		Method is triggered when the route changes. This will call the toggleVisability
		method to show/hide Background chooser button

		@method onRouteChanged
		@override Base
		**/
		onRouteChanged: function (view) {
			this.currentRoute = view.name;
			this.toggleVisibility();
		},

		/**
		This sets up the pub-sub connection to listen when the background data has been received.
		**/
		onReady: function () {
			this.subscribe('background_retrieved', function (payload) {
				$('#background').html(payload.content);

				umobile.resource.Background.executeBackgroundScript();
			});
		}
	});

})(jQuery, _, Backbone, umobile, config);