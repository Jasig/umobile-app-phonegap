/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Dashboard view.

	@class DashboardView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.DashboardView = umobile.view.LoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		**/
		name: 'dashboard',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-dashboardview',
			moduleList: '#moduleList'
		},

		/**
		Method renders modules.

		@method renderModules
		@param {Object} collection Reference to the ModuleCollection.
		**/
		renderModules: function (collection) {
			// Define & initialize.
			var moduleList = this.loc('moduleList').html(''),
				modules = collection || this.moduleCollection.toJSON();

			// Iterate over modules and initialize each module view.
			_.each(modules, function (module, idx) {
				var moduleView = new umobile.view.Module({
					model: module
				});
				moduleList.append(moduleView.render().el);
			}, this);
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Dashboard view.

		@method renderContent
		@param {Object} collection Reference to the ModuleCollection.
		@override LoadedView
		**/
		renderContent: function (collection) {
			this.renderModules(collection);
		}
	});

})(jQuery, _, Backbone, umobile, config);