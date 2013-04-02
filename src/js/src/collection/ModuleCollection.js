/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Module collection houses a collection of modules or portlets.

	@class ModuleCollection
	@submodule collection
	@namespace collection
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
		Method overrides Backbone.save. Makes an update call to the
		umobile.storage.sync method.

		@method save
		@param {Object} options Success and error callbacks.
		**/
		save: function (options) {
			this.sync('update', this, options);
		},

		/**
		Method overrides Backbone.fetch. Makes a read call to the
		umobile.storage.sync method.

		@method fetch
		@param {Object} options Success and error callbacks.
		**/
		fetch: function (options) {
			this.sync('read', this, options);
		},

		/**
		Method overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'modules')
	});

})(jQuery, _, umobile, config);