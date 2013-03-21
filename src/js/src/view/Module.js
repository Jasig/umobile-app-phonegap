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
	umobile.view.Module = umobile.view.Base.extend({
		/**
		Property houses HTML tag name used to build view.

		@property tagName
		@type String
		**/
		tagName: 'li',

		/**
		Property houses class name that is added to the tagName.

		@property className
		@type String
		**/
		className: 'um-module-item',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-module'
		},

		/**
		Property houses Module model.

		@property moduleModel
		@type Object
		**/
		moduleModel: {},

		/**
		Method renders the Module template.

		@method render
		@return {Object} Reference to the Module view.
		**/
		render: function () {
			var model = this.moduleModel;
			this.$el.html(this.template(model));
			return this;
		},

		/**
		Method initializes the view.

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