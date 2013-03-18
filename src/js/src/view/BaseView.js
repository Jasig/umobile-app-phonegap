/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Class abstraction. Defines properties and methods
	that all views require.

	@class BaseView
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.BaseView = Backbone.View.extend({
		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {},

		/**
		Houses the compiled handlebar template.

		@property template
		@type Object
		**/
		template: {},

		/**
		Collection of modules.

		@property moduleCollection
		@type Object
		**/
		moduleCollection: {},

		/**
		Credential model. Represents user credential state.

		@property credModel
		@type Object
		**/
		credModel: {},

		/**
		State model. Represents application state.

		@property stateModel
		@type Object
		**/
		stateModel: {},

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
		Entry point for the base view.

		@method initialize
		**/
		initialize: function () {
			_.bindAll(this);

			// Cache module collection.
			this.moduleCollection = umobile.app.moduleCollection;

			// Cache credential model.
			this.credModel = umobile.app.credModel;

			// Cache state model.
			this.stateModel = umobile.app.stateModel;
		}
	});

})(jQuery, _, Backbone, umobile, config);