/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages the individual Module or portlet view.

	@class Module
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Module = umobile.view.BaseView.extend({
		/**
		HTML tag name used to build a Module view.

		@property tagName
		@type String
		**/
		tagName: 'li',

		/**
		Class name that is added to the tagName
		when building a Module view.

		@property className
		@type String
		**/
		className: 'um-module-item',

		/**
		Object hash of valid DOM selectors for
		the Module view.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-module'
		},

		/**
		Model for the Module view.

		@property moduleModel
		@type Object
		**/
		moduleModel: {},

		/**
		Method renders the UI for the Module view.

		@method render
		@return {Object} Module view.
		**/
		render: function () {
			var model = this.moduleModel.attributes;
			this.$el.html(this.template(model));
			return this;
		},

		/**
		Entry point for the Module view.

		@method initialize
		@param {Object} options Object hash of options.
		**/
		initialize: function (options) {
			_.bindAll(this);
			this.moduleModel = options.model;
			this.template = Handlebars.compile($(this.selectors.template).html());
		}
	});

})(jQuery, _, umobile, config);