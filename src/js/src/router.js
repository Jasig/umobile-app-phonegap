/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Houses the Backbone.Router implementation.

	@class RouteManager
	@submodule router
	@namespace router
	**/
	umobile.router.RouteManager = Backbone.Router.extend({
		/**
		@property viewManager
		**/
		viewManager: {},

		/**
		@property routes
		**/
		routes: {
			'': 'home',
			'login': 'login'
		},

		/**
		@method home
		**/
		home: function () {
			var home = new umobile.view.Home();
			this.viewManager.show(home);
		},

		/**
		@method login
		**/
		login: function () {
			var login = new umobile.view.Login();
			this.viewManager.show(login);
		},

		/**
		@method initialize
		**/
		initialize: function () {
			this.viewManager = new umobile.view.ViewManager();
		}
	});

})(jQuery, _, Backbone, umobile, config);