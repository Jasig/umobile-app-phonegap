/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Credential model houses information relating to a user's
	login credentials.

	@class Credential
	@submodule model
	@namespace model
	@constructor
	**/
	umobile.model.Credential = Backbone.Model.extend({
		/**
		Property houses default model attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			id: 'credentials',
			username: null,
			password: null
		},

		/**
		Property houses validation rules.

		msg is the returned error message, it has to match the key in message_xx.json

		@property validation
		@type Object
		**/
		validation: {
			username: {
				required: true,
				msg : 'login.error_username'
			},
			password: {
				required: true,
				msg : 'login.error_password'
			}
		},

		/**
		Method overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'credentials')
	});

})(jQuery, _, umobile, config);