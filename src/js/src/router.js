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
			'': 'dashboard',
			'login': 'login',
			'modules/*module': 'module'
		},

		/**
		@method dashboard
		**/
		dashboard: function () {
			var dashboard = new umobile.view.Dashboard();
			this.viewManager.show(dashboard);
		},

		/**
		@method login
		**/
		login: function () {
			var login = new umobile.view.Login();
			this.viewManager.show(login);
		},

		/**
		@method module
		**/
		module: function () {
			var module = new umobile.view.ModuleDetail({path: Backbone.history.fragment});
			this.viewManager.show(module);
		},

		/**
		Listens for the route to change. When triggered,
		it updates the class name on the body.

		@method onRouteChanged
		**/
		onRouteChanged: function (route, routeParam) {
			var className;
			route = route.split(':');
			className = ('um-' + route[1]);
			$('body').removeAttr('class').addClass(className);
		},

		/**
		@method initialize
		**/
		initialize: function () {
			// Initialize the Page view.
			var page = new umobile.view.Page();

			// Initialize the ViewManager.
			this.viewManager = new umobile.view.ViewManager();

			// Bind to all the routes. When they change, call
			// the onRouteChanged method.
			this.on('all', _.bind(this.onRouteChanged, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);