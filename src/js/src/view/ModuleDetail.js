/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Module view.

	@class ModuleDetail
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.ModuleDetail = umobile.view.LoadedView.extend({
		/**
		Name of the loaded view.

		@property name
		@type String
		**/
		name: 'module',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-moduledetail'
		},

		/**
		The url path loaded into the application frame.

		@property path
		@type String
		**/
		path: '/',

		/**
		Method renders the UI for loaded ModuleDetail view.

		@method render
		@return {Object}
		**/
		render: function () {
			// Cover the interface.
			this.showLoader();
			this.$el.addClass('hidden')
				.html(this.template({path: this.path}))
				.removeClass('hidden');
			this.hideLoader();
			return this;
		},

		/**
		Entry point for the ModuleDetail view.

		@method initialize
		@param {Object} options Object hash of options.
		@override LoadedView
		**/
		initialize: function (options) {
			// Call super.
			umobile.view.LoadedView.prototype.initialize.apply(this, arguments);

			// Cache the path.
			this.path = options.path;

			// Compile screen template.
			this.template = Handlebars.compile($(this.selectors.template).html());
		}
	});

})(jQuery, _, Backbone, umobile, config);