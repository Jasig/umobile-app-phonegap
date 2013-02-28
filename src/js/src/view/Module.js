/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages the individual Module or portlet view.

	@class Module
	@namespace view
	@constructor
	**/
	umobile.view.Module = Backbone.View.extend({
		/**
		HTML tag name used to build a Module view.

		@property tagName
		@type String
		**/
		tagName: 'div',

		/**
		Class name that is added to the tagName
		when building a Module view.

		@property className
		@type String
		**/
		className: 'module-item portlet',

		/**
		Object hash of valid DOM selectors for
		the Module view.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#module-template'
		},

		/**
		Template for the Module view.

		@property template
		@type Object
		**/
		template: {},

		/**
		Model for the Module view.

		@property moduleModel
		@type Object
		**/
		moduleModel: {},

		/**
		Backbone events object.

		@property events
		@type Object
		**/
		events: {
			'click a': 'moduleClickHander'
		},

		/**
		Click handler for the portlet icon.

		@method showModuleClickHander
		@param {Object} e Event object.
		**/
		moduleClickHander: function (e) {
			e.preventDefault();
			$.publish('module.selected', this.moduleModel);
		},

		/**
		Helper method. Given the passed property, this method
		parses the selector object looking for a match.

		@method loc
		@param {String} property The property to look up.
		@return {Object} Cached, jQuery-wrapped DOM element.
		**/
		loc: function (property) {
			if (!this.selectors.hasOwnProperty(property)) {
				throw new Error('The property, ' + property + ' is not a valid selector.');
			}

			return this.$(this.selectors[property]);
		},

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
		Method is called when the view is first created.

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