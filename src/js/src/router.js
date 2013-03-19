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
		@property currentViewClass
		**/
		currentViewClass: null,

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
		it updates the class name on the content container.

		@method onRouteChanged
		**/
		onRouteChanged: function (route, routeParam) {
			// Define.
			var className, container;

			// Initialize.
			container = $('#content');
			route = route.split(':');
			className = ('um-' + route[1]);

			// Remove the class from the container when generated className
			// is different from the stored currentViewClass.
			if (this.currentViewClass && className !== this.currentViewClass) {
				container.removeClass(this.currentViewClass);
			}

			// Add class name to container.
			container.addClass(className);
			this.currentViewClass = className;
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