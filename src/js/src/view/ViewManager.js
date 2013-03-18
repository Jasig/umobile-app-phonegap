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
			@property currentView
			**/
			currentView: null,

			/**
			@method show
			**/
			show: function (view) {
				if (this.currentView) {
					this.currentView.close();
				}

				this.currentView = view;
				this.currentView.render();
				$.publish('view.rendered', view);
			}

		};
		return ViewManager;
	};

})(jQuery, _, Backbone, umobile, config);