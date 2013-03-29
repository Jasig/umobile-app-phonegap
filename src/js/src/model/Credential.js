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
			username: 'guest',
			password: 'guest'
		},

		/**
		Property houses validation rules.

		@property validation
		@type Object
		**/
		validation: {
			username: {
				required: true
			},
			password: {
				required: true
			}
		},

		/**
		Method checks the model to determine whether the current user
		is signed in as a guest user.

		@method isGuest
		@return {Boolean}
		**/
		isGuest: function () {
			return (this.get('username') === 'guest') ? true : false;
		},

		/**
		Method overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(umobile.storage[config.storageFn], 'credentials')
	});

})(jQuery, _, umobile, config);