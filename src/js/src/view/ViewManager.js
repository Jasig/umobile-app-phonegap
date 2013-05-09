/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Class manages the rendering and closing of screens.

	@class ViewManager
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.ViewManager = function () {
		var ViewManager = {
			/**
			Property houses a reference to the current view.

			@property currentView
			**/
			currentView: null,

			/**
			Method returns a reference to the current view.

			@method getCurrentView
			@return {Object} Reference to the current view.
			**/
			getCurrentView: function () {
				return this.currentView;
			},

			/**
			Method destroys old views and renders new views.

			@method show
			@param {Object} view Reference to current view.
			**/
			show: function (view) {
				if (this.currentView) {
					this.currentView.destroy();
					delete this.currentView;
				}

				this.currentView = view;
				this.currentView.render();
			}

		};
		return ViewManager;
	};

})(jQuery, _, Backbone, umobile, config);