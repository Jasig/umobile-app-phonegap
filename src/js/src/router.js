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
		Property houses the current view class name.

		@property currentViewClass
		@type String
		**/
		currentViewClass: null,

		/**
		Property houses Backbone routes.

		@property routes
		@type Object
		**/
		routes: {
			'dashboard': 'dashboard',
			'login': 'login',
			'modules/*module': 'module',
			'*other': 'dashboard'
		},

		/**
		Method initializes the Dashboard view.

		@method dashboard
		**/
		dashboard: function () {
			var dashboard = new umobile.view.DashboardView();
			umobile.app.viewManager.show(dashboard);
		},

		/**
		Method initializes the Login view.

		@method login
		**/
		login: function () {
			var login = new umobile.view.LoginView();
			umobile.app.viewManager.show(login);
		},

		/**
		Method initializes the Module view.

		@method module
		**/
		module: function () {
			var module = new umobile.view.ModuleView({path: Backbone.history.fragment});
			umobile.app.viewManager.show(module);
		},

		/**
		Listens for the route to change. When triggered,
		it updates the class name on the content container
		and broadcasts the changed route.

		@method onRouteChanged
		@param {String} route Reference to full route path.
		**/
		onRouteChanged: function (route) {
			// Define.
			var className, container, view;

			// Initialize.
			container = $('#content');
			route = route.split(':');
			view = route[1];
			className = ('um-' + view);

			// Remove the class from the container when generated className
			// is different from the stored currentViewClass.
			if (this.currentViewClass && className !== this.currentViewClass) {
				container.removeClass(this.currentViewClass);
			}

			// Add class name to container.
			container.addClass(className);
			this.currentViewClass = className;

			// Broadcast route changed event.
			$.publish('route.changed', {name: view});
		},

		/**
		Method initializes the router.

		@method initialize
		**/
		initialize: function () {
			// Initialize the Page view.
			var page = new umobile.view.Page();

			// Initialize the ViewManager.
			umobile.app.viewManager = new umobile.view.ViewManager();

			// Bind to all the routes. When they change, call
			// the onRouteChanged method.
			this.on('all', _.bind(this.onRouteChanged, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);