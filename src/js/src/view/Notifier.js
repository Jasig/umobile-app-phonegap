/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	...

	@class Notifier
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Notifier = umobile.view.Base.extend({
		/**
		Property houses HTML tag name used to build view.

		@property tagName
		@type String
		**/
		tagName: 'div',

		/**
		Property houses class name that is added to the tagName.

		@property className
		@type String
		**/
		className: 'um-notifier well',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-notifier'
		},

		/**
		Property houses the notifier model.

		@property model
		@type Object
		**/
		model: {},

		/**
		Method renders the Notifier template.

		@method render
		@return {Object} Reference to the Notifer view.
		**/
		render: function () {
			var model = this.model.toJSON();
			this.$el.html(this.template(model)).removeClass('hidden');
			return this;
		},

		/**
		Method updates the Notifier model.

		@method updateModel
		@param {Object} options Options object.
		**/
		updateModel: function (options) {
			if (options && options.hasOwnProperty('title')) {
				this.model.set({title: options.title});
			}

			if (options && options.hasOwnProperty('message')) {
				this.model.set({message: options.message});
			}
		},

		/**
		Method initializes the view.

		@method initialize
		@param {Object} options Object hash of options.
		**/
		initialize: function (options) {
			_.bindAll(this);
			this.model = new umobile.model.Notifier();
			this.updateModel(options);
			this.template = Handlebars.compile($(this.selectors.template).html());
		}
	});

})(jQuery, _, umobile, config);