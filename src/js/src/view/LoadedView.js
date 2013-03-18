/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Class abstraction. Defines properties and methods
	that all loaded views.

	@class LoadedView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.LoadedView = umobile.view.BaseView.extend({
		/**
		Name of the loaded view.

		@property name
		@type String
		**/
		name: 'base',

		/**
		Root DOM element.

		@property el
		@type Object
		**/
		el: '#view',

		/**
		Method returns the name of the loaded view.

		@method getLoadedViewName
		**/
		getLoadedViewName: function () {
			return this.name;
		},

		/**
		Method cleans up the DOM and unbinds
		events when the loaded view changes.

		@method close
		**/
		close: function () {
			// Clean up the DOM and DOM events.
			this.remove();
			$('#viewLoader').prepend(this.$el);

			// Unbind any events that our view triggers.
			this.unbind();
		},

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
		@return {Object}
		**/
		render: function () {
			this.showLoader();
			this.$el.addClass('hidden')
				.html(this.template({}))
				.removeClass('hidden');
			this.hideLoader();
			return this;
		},

		/**
		Entry point for all loadedViews.

		@method initialize
		@override BaseView
		**/
		initialize: function () {
			// Call super.
			umobile.view.BaseView.prototype.initialize.apply(this, arguments);

			// Compile screen template.
			this.template = Handlebars.compile($(this.selectors.template).html());
		}
	});

})(jQuery, _, Backbone, umobile, config);