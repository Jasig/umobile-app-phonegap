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
			submit: '#submitButton',
			alert: '#loginAlert',
			login: '#login'
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
			Backbone.Validation.unbind(this);

			// Unbind models.
			this.model.unbind('validated:valid');
			this.model.unbind('validated:invalid');
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
			this.model.save({username: username.val(), password: password.val()});
			//this.model.change();
		},

		/**
		Handler for form submission.

		@method submitHandler
		@param {Object} e Event object.
		**/
		submitHandler: function (e) {
			var form;
			e.preventDefault();
			form = $(e.target).closest('form');
			this.updateCredentials(form);
		},

		/**
		Method builds an object containing form input data.

		@method getInputs
		@return {Object} Object containing form input data.
		**/
		getInputs: function () {
			var inputs = {
				username: {
					ele: this.loc('username'),
					value: this.loc('username').val()
				},
				password: {
					ele: this.loc('password'),
					value: this.loc('password').val()
				}
			};
			return inputs;
		},

		/**
		Method resets the alert message.

		@method resetAlert
		**/
		resetAlert: function () {
			var alert = this.loc('alert');
			if (!alert.is(':hidden')) {
				alert.slideUp('fast');
			}
		},

		/**
		Method resets the login form.

		@method resetInputs
		**/
		resetInputs: function () {
			var inputs = this.getInputs();
			_.each(inputs, function (obj, key) {
				var control = obj.ele.closest('.control-group'),
					help = control.find('.help-inline');
				if (control.hasClass('error')) {
					control.removeClass('error');
					help.hide();
				}
			}, this);
		},

		/**
		Method updates the form when the validation on the model is invalid.

		@method invalidFormHandler
		@param {Object} model Reference to Credential model.
		@param {Object} errors Reference to model errors.
		**/
		invalidFormHandler: function (model, errors) {
			// Define.
			var alert, inputs;

			// Initialize.
			alert = this.loc('alert');
			inputs = this.getInputs();

			// Reset inputs.
			this.resetInputs();

			// Reveal error message.
			alert.slideDown('fast');
			_.each(errors, function (value, key) {
				var input, control, help;
				if (inputs.hasOwnProperty(key)) {
					input = inputs[key].ele;
					control = input.closest('.control-group');
					help = control.find('.help-inline');
					control.addClass('error');
					help.html(value).show();
				}
			});
		},

		/**
		Method updates the form when the validation on the model is valid.

		@method validFormHandler
		@param {Object} model Reference to Credential model.
		**/
		validFormHandler: function (model) {
			this.resetAlert();
			this.resetInputs();
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
			this.model.bind('validated:valid', _.bind(this.validFormHandler, this));

			// Bind to model. Invalid model callback.
			this.model.bind('validated:invalid', _.bind(this.invalidFormHandler, this));
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Login view.

		@method renderContent
		@param {Object} collection Reference to ModuleCollection.
		@override LoadedView
		**/
		renderContent: function (collection) {
			this.bindValidation();
		}
	});

})(jQuery, _, Backbone, umobile, config);