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
	umobile.view.LoginView = umobile.view.LoadedView.extend({
		/**
		Property houses the name of the loaded view.

		@property name
		@type String
		**/
		name: 'login',

		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-loginview',
			username: '#username',
			password: '#password',
			submit: '#submitButton'
		},

		/**
		Property houses the Credential model.

		@property model
		@type Object
		**/
		model: {},

		/**
		Property houses Backbone events object.

		@property events
		@type Object
		**/
		events: {
			'submit form': 'submitHandler'
		},

		/**
		Method houses view clean up operations.

		@method close
		**/
		close: function () {
			// Unbind validation.
			//Backbone.Validation.unbind(this);

			// Unbind models.
			//this.model.unbind('validated:valid');
			//this.model.unbind('validated:invalid');
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

			// Save credentials.
			console.log('Save Credentials: ', username.val(), ' & ', password.val());
			//this.model.save({username: username.val(), password: password.val()}, {silent: false});
			//this.model.change();
		},

		/**
		Handler for the update button on the Login view.

		@method submitHandler
		@param {Object} e Event object.
		**/
		submitHandler: function (e) {
			var cb = new Date().getTime();
			//console.log('Submit Button: ', cb);
			//var form;
			e.preventDefault();
			//form = $(e.target).closest('form');
			//this.updateCredentials(form);
		},

		/**
		Method configures the Backbone.Validation plugin.

		@method bindValidation
		**/
		bindValidation: function () {
			// Backbone.Validation plugin expects the model to be housed
			// within a model:{} and not the credModel:{}.
			this.model = this.credModel;

			// Bind Backbone.Validation to the Login view.
			Backbone.Validation.bind(this);

			// Bind to model. Valid model callback.
			this.model.bind('validated:valid', function (model) {
				console.log('Model is valid: ', model);
			});

			// Bind to model. Invalid model callback.
			this.model.bind('validated:invalid', function (model, errors) {
				console.log('Model is invalid: ', errors);
			});

			console.log('Bind Validation');
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Login view.

		@method renderContent
		@param {Object} collection Reference to ModuleCollection.
		@override LoadedView
		**/
		renderContent: function (collection) {
			//this.renderForm();
		}
	});

})(jQuery, _, Backbone, umobile, config);