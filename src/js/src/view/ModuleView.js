/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Module view.

	@class ModuleView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.ModuleView = umobile.view.LoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		@override LoadedView
		**/
		name: 'module',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		@override Base
		**/
		selectors: {
			template: '#views-partials-moduleview',
			notifier: '#notifier',
			frame: '#moduleFrame'
		},

		/**
		Method empties root containers.

		@method cleanContainers
		**/
		cleanContainers: function () {
			var notifier = this.loc('notifier'),
				frame = this.loc('frame');

			notifier.empty().hide();
			frame.hide();
		},

		/**
		Method renders the notifier.

		@method renderNotifier
		**/
		renderNotifier: function () {
			// Define.
			var notifier, notifierModel, notifierView;

			// Initialize.
			notifier = this.loc('notifier');
			notifierModel = new umobile.model.Notifier();
			notifierView = new umobile.view.Notifier({model: notifierModel.toJSON()});
			notifier.append(notifierView.render().el).show();
		},

		/**
		Method renders the frame container.

		@method renderFrame
		**/
		renderFrame: function () {
			var frame = this.loc('frame').show();
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Module view.

		@method renderError
		@override LoadedView
		**/
		renderError: function () {
			this.cleanContainers();
			this.renderNotifier();
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Module view.

		@method renderContent
		@param {Object} collection Reference to the ModuleCollection.
		@override LoadedView
		**/
		renderContent: function (collection) {
			this.cleanContainers();
			this.renderFrame();
		}
	});

})(jQuery, _, Backbone, umobile, config);