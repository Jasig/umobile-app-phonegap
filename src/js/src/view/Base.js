/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Class abstraction. Defines properties and methods
	that all views require.

	@class Base
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Base = Backbone.View.extend({
		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {},

		/**
		Property houses compiled handlebar template.

		@property template
		@type Object
		**/
		template: {},

		/**
		Property houses collection of modules.

		@property moduleCollection
		@type Object
		**/
		moduleCollection: {},

		/**
		Property houses the Credential model.

		@property credModel
		@type Object
		**/
		credModel: {},

		/**
		Property houses the State model.

		@property stateModel
		@type Object
		**/
		stateModel: {},

		/**
		Property houses binding to $.publish method.

		@property publish
		@type Object
		**/
		publish: _.bind($.publish, this),

		/**
		Property houses binding to $.subscribe method.

		@property subscribe
		@type Object
		**/
		subscribe: _.bind($.subscribe, this),

		/**
		Property houses binding to $.unsubscribe method.

		@property unsubscribe
		@type Object
		**/
		unsubscribe: _.bind($.unsubscribe, this),

		/**
		Property houses utilty implementation.

		@property utils
		@type Object
		**/
		utils: {},

		/**
		Helper method. Given the passed property, this method
		parses the selector object looking for a match.

		@method loc
		@param {String} property The property to look up.
		@param {Boolean} isRoot Flag to search for property on the body tag.
		@return {Object} Cached, jQuery-wrapped DOM element.
		**/
		loc: function (property, isRoot) {
			var scope;
			if (isRoot && typeof isRoot !== 'boolean') {
				throw new Error('Unsupported type. Expected boolean for isRoot argument and not ' + typeof isRoot + '.');
			}

			scope = (isRoot) ? $('body') : this.$el;
			return scope.find(this.selectors[property]);
		},

		/**
		Method initializes the view.

		@method initialize
		**/
		initialize: function () {
			// Bind all properties & methods.
			_.bindAll(this);

			// Cache module collection.
			this.moduleCollection = umobile.app.moduleCollection;

			// Cache credential model.
			this.credModel = umobile.app.credModel;

			// Cache state model.
			this.stateModel = umobile.app.stateModel;

			// Cache utilities.
			this.utils = umobile.utility.Utils;
		}
	});

})(jQuery, _, Backbone, umobile, config);