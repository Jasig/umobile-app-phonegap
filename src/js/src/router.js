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
			'login': 'login',
			'modules/*module': 'module'
		},

		/**
		@method home
		**/
		home: function () {
			var home = new umobile.view.Home();
			home.name = 'home';
			this.viewManager.show(home);
		},

		/**
		@method login
		**/
		login: function () {
			var login = new umobile.view.Login();
			login.name = 'login';
			this.viewManager.show(login);
		},

		/**
		@method module
		**/
		module: function () {
			var module = new umobile.view.ModuleDetail({path: Backbone.history.fragment});
			module.name = 'module';
			this.viewManager.show(module);
		},

		/**
		@method initialize
		**/
		initialize: function () {
			var page = new umobile.view.Page();
			this.viewManager = new umobile.view.ViewManager();
		}
	});

})(jQuery, _, Backbone, umobile, config);