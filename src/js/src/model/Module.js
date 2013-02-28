/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Module model houses information relating to each
	module or portlet.

	@class Module
	@submodule model
	@namespace model
	@constructor
	**/
	umobile.model.Module = Backbone.Model.extend({
		/**
		The defaults hash is used to specify the default attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			fname: 'fname',
			title: 'Title',
			url: 'url',
			iconUrl: 'imgUrl',
			newItemCount: 0,
			isNative: false
		},

		/**
		Method overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'module')
	});

})(jQuery, _, umobile, config);