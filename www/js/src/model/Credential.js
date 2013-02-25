/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Credential model houses information relating to a user's
	login credentials.

	@class Credential
	@constructor
	**/
	umobile.model.Credential = Backbone.Model.extend({
		/**
		The defaults hash is used to specify the default attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			id: "credentials",
			username: null,
			password: null
		},

		/**
		Overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], "credentials")
	});

})(jQuery, _, umobile, config);