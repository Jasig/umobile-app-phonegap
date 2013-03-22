/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Class abstraction. Defines properties and methods
	for all loaded views.

	@class LoadedView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.LoadedView = umobile.view.Base.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		**/
		name: 'base',

		/**
		Property houses root DOM element.

		@property el
		@type Object
		**/
		el: '#view',

		/**
		Method returns the name of the loaded view.

		@method getLoadedViewName
		@return {String} Name of the loaded view.
		**/
		getLoadedViewName: function () {
			return this.name;
		},

		/**
		Method cleans up the DOM and unbinds
		events when the loaded view changes.

		@method destroy
		**/
		destroy: function () {
			// Remove DOM.
			this.remove();

			// Unbind.
			this.unbind();

			// Unbind models & collections.
			this.moduleCollection.off('reset', this.render);

			// Undelegate events.
			this.undelegateEvents();

			// Custom removal.
			if (this.close && _.isFunction(this.close)) {
				this.close();
			}
		},

		/**
		Method is meant to be overwritten. This method is
		a placeholder for child views to place their custom
		view error content.

		@method renderError
		**/
		renderError: function () {},

		/**
		Method is meant to be overwritten. This method is
		a placeholder for child views to place their custom
		view content.

		@method renderContent
		@param {Object} collection Reference to ModuleCollection.
		**/
		renderContent: function (collection) {},

		/**
		Method shows the loading mask when switching views.

		@method showLoader
		**/
		showLoader: function () {
			var loader = $('#loader');
			loader.show();
		},

		/**
		Method hides the loading mask when switching views.

		@method hideLoader
		**/
		hideLoader: function () {
			var loader = $('#loader');
			loader.fadeOut();
		},

		/**
		Method renders the UI for all loaded views.

		@method render
		@return {Object} Reference to loaded view.
		**/
		render: function () {
			// Loader.
			this.showLoader();

			// Define & Initialize.
			var collection = this.moduleCollection.toJSON();

			// Render view when data is available.
			if (!_.isEmpty(collection)) {
				// Render main template.
				this.$el.addClass('hidden')
					.html(this.template(this.options))
					.removeClass('hidden');

				// Render custom content.
				if (collection[0].fname === 'fname') {
					this.renderError();
				} else {
					this.renderContent(collection);
				}

				// Append '#view' to '#viewLoader'.
				$('#viewLoader').append(this.$el);

				// Delegate Events.
				this.delegateEvents(this.events);

				// Loader.
				this.hideLoader();
			}

			return this;
		},

		/**
		Method initializes the view.

		@method initialize
		@param {Object} options Options object.
		@override Base
		**/
		initialize: function (options) {
			// Call super.
			this._super();

			// Cache options.
			this.options = (options && !_.isEmpty(options)) ? options: {};

			// Compile screen template.
			this.template = Handlebars.compile($(this.selectors.template).html());

			// Listen to the reset event on the moduleCollection.
			// When triggered recall the render method.
			this.moduleCollection.on('reset', _.bind(this.render, this));
		}
	});

})(jQuery, _, Backbone, umobile, config);