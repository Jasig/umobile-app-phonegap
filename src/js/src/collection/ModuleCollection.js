/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Module collection houses a collection of modules or portlets.

	@class ModuleCollection
	@constructor
	**/
	umobile.collection.ModuleCollection = Backbone.Collection.extend({
		/**
		The model class contained by the collection.

		@property model
		@type Object
		**/
		model: umobile.model.Module,

		/**
		Entry point for the ModuleCollection.

		@method initialize
		**/
		initialize: function () {
			this.sync = umobile.storage.sync(umobile.storage[config.storageFn], 'modules');
		},

		/**
		Overrides Backbone.save. Makes an 'update' call to the
		umobile.storage.sync method.

		@method save
		@param {Object} options Success and error callbacks.
		**/
		save: function (options) {
			this.sync('update', this, options);
		},

		/**
		Overrides Backbone.fetch. Makes a 'read' call to the
		umobile.storage.sync method.

		@method fetch
		@param {Object} options Success and error callbacks.
		**/
		fetch: function (options) {
			this.sync('read', this, options);
		},

		/**
		Overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'modules')
	});

})(jQuery, _, umobile, config);