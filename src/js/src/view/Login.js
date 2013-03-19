/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Manages the loaded Login view.

	@class Login
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Login = umobile.view.LoadedView.extend({
		/**
		Name of the loaded view.

		@property name
		@type String
		**/
		name: 'login',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-login',
			username: '#username',
			password: '#password',
			submit: '#submitButton'
		},

		/**
		Backbone events object.

		@property events
		@type Object
		**/
		events: {
			'submit form': 'submitHandler'
		},

		/**
		Method extracts credentials from the login form
		and attempts to persist them by calling save on
		the Credential model. Triggers a change event
		on the Credential model.

		@method updateCredentials
		@param {Object} form jQuery-wrapped form element.
		**/
		updateCredentials: function (form) {
			// Define & initialize.
			var username = form.find(this.selectors.username),
				password = form.find(this.selectors.password);

			// Save credentials without raising an event.
			console.log('Save Credentials: ', username.val(), ' & ', password.val());
			this.credModel.save({username: username.val(), password: password.val()}, {silent: false});
			this.credModel.change();
		},

		/**
		Handler for the update button on the Credential view.

		@method submitHandler
		@param {Object} e Event object.
		**/
		submitHandler: function (e) {
			var form;
			e.preventDefault();
			form = $(e.target).closest('form');
			this.updateCredentials(form);
		}
	});

})(jQuery, _, Backbone, umobile, config);