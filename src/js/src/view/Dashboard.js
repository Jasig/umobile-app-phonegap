/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Dashboard view.

	@class Dashboard
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Dashboard = umobile.view.LoadedView.extend({
		/**
		Name of the loaded view.

		@property name
		@type String
		**/
		name: 'dashboard',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-dashboard',
			moduleList: '#moduleList'
		},

		/**
		Render modules or portlets to the UI.

		@method renderModules
		@param {Object} collection
		**/
		renderModules: function (collection) {
			// Define & initialize.
			var moduleList = this.loc('moduleList').html(''),
				modules = collection.models || this.moduleCollection.toJSON();

			// Iterate over modules and initialize each module view.
			_.each(modules, function (module, idx) {
				var moduleView = new umobile.view.Module({
					model: module
				});
				moduleList.append(moduleView.render().el);
			}, this);
		},

		/**
		Method renders the UI for the loaded Dashboard view.

		@method render
		@override LoadedView
		@return {Object}
		**/
		render: function (collection) {
			// Define data source.
			var moduleCollection = collection || this.moduleCollection;

			// Cover the interface.
			this.showLoader();

			if (moduleCollection.hasOwnProperty('models') && moduleCollection.models.length > 0) {
				// Render the loaded Dashboard view.
				this.$el.addClass('hidden')
					.html(this.template({}))
					.removeClass('hidden');

				// Render the Module view.
				this.renderModules(moduleCollection);

				// Reveal the interface.
				this.hideLoader();
			}

			return this;
		},

		/**
		Entry point for loaded Dashboard view.

		@method initialize
		@override LoadedView
		**/
		initialize: function () {
			// Call super.
			umobile.view.LoadedView.prototype.initialize.apply(this, arguments);

			// Listen for the module collection to be reset.
			// When it is, execute the render method.
			this.moduleCollection.on('reset', _.bind(function (collection) {
				this.render(collection);
			}, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);