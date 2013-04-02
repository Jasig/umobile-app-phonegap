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
			warn: '#loginAlert',
			login: '#login',
			spinner: '#submitSpinner'
		},

		/**
		Property houses messages.

		@property messages
		@type Object
		**/
		messages: {
			validationError: 'You have errors with your username or password.',
			guestLoginError: 'We tried to log you into the portal as a guest but something went wrong. Please try to login with your credentials.',
			loginError: 'We tried to log you into the portal but something went wrong. Please try to login again.'
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

		@method clean
		**/
		clean: function () {
			this.unBindEventListeners();
		},

		/**
		Method manages the alert.
		TODO: Move the alert implementation into a seperate view.

		@method warn
		@param {String} action The action to take (i.e., hide or show).
		@param {String} message The message to render.
		**/
		warn: function (action, message) {
			// Define & set defaults.
			var warn = this.loc('warn');
			action = (!action) ? 'hide' : action;
			message = (!message) ? this.messages.validationError : message;

			switch (action) {
			case 'hide':
				warn.slideUp('fast');
				break;
			case 'show':
				warn.find('.message').html(message);
				warn.slideDown('fast');
				break;
			default:
				warn.slideUp('fast');
			}
		},

		/**
		Method removes existing error messages
		from the login form.

		@method resetErrors
		**/
		resetErrors: function () {
			var inputs = this.getInputs();
			_.each(inputs, function (obj, key) {
				var control = obj.el.closest('.control-group'),
					help = control.find('.help-inline');
				if (control.hasClass('error')) {
					control.removeClass('error');
					help.hide();
				}
			}, this);
		},

		/**
		Method builds an object containing form input data.

		@method getInputs
		@return {Object} Object containing form input data.
		**/
		getInputs: function () {
			// Define.
			var inputs, elements;

			// Initialize.
			inputs = {};
			elements = this.$el.find(':input');

			// Iterate over elements.
			_.each(elements, function (element, index) {
				var tag, el, name;
				tag = element.nodeName.toLowerCase();
				if (tag === 'input') {
					el = $(element);
					name = el.attr('name');
					inputs[name] = {
						el: el,
						value: el.val()
					};
				}
			}, this);

			return inputs;
		},

		/**
		Method locks or disables the form when being submitted.

		@method lockLogin
		**/
		lockLogin: function () {
			if (this.loc('spinner').hasClass('invisible')) {
				this.loc('username').attr('disabled', 'disabled');
				this.loc('password').attr('disabled', 'disabled');
				this.loc('submit').addClass('disabled');
				this.loc('spinner').removeClass('invisible');
			}
		},

		/**
		Method unlocks or removes the login form
		from a disabled state.

		@method unlockLogin
		**/
		unlockLogin: function () {
			if (!this.loc('spinner').hasClass('invisible')) {
				this.loc('username').removeAttr('disabled');
				this.loc('password').removeAttr('disabled');
				this.loc('submit').removeClass('disabled');
				this.loc('spinner').addClass('invisible');
			}
		},

		/**
		Method updates the form when the validation on the model is invalid.

		@method invalidFormHandler
		@param {Object} model Reference to Credential model.
		@param {Object} errors Reference to model errors.
		**/
		invalidFormHandler: function (model, errors) {
			// Cache inputs.
			var inputs = this.getInputs();

			// Unlock the login.
			this.unlockLogin();

			// Reset existing errors.
			this.resetErrors();

			// Show warning message.
			this.warn('show', this.messages.validationError);

			// Show input errors.
			_.each(errors, function (value, key) {
				var input, control, help;
				if (inputs.hasOwnProperty(key)) {
					input = inputs[key].el;
					control = input.closest('.control-group');
					help = control.find('.help-inline');
					control.addClass('error');
					help.html(value).show();
				}
			});
		},

		/**
		Method sets up bindings on the view and model.

		@method bindEventListeners
		**/
		bindEventListeners: function () {
			// Bind Backbone.Validation to the Login view.
			Backbone.Validation.bind(this);

			// Bind to model. Invalid model callback.
			this.model.bind('validated:invalid', _.bind(this.invalidFormHandler, this));

			// Listen to the save event on the Credential model.
			this.model.on('change', _.bind(this.onUpdateCredentials, this));
		},

		/**
		Method unbinds events on the view and model.

		@method unBindEventListeners
		**/
		unBindEventListeners: function () {
			// Unbind validation.
			if (Backbone.Validation.unbind) {
				Backbone.Validation.unbind(this);
			}

			// Unbind model.
			if (this.model.unbind) {
				this.model.unbind('validated:invalid');
				this.model.unbind('change');
			}
		},

		/**
		Method logs the user into the portal.

		@method onUpdateCredentials
		**/
		onUpdateCredentials: function () {
			// Reset existing errors.
			this.resetErrors();

			// Hide warning message.
			this.warn('hide');

			// Log the user into the portal.
			umobile.auth.establishSession();
		},

		/**
		Method extracts credentials from the login form
		and attempts to persist them by calling save on
		the Credential model. Triggers a change event
		on the Credential model.

		@method updateCredentials
		**/
		updateCredentials: function () {
			// Define.
			var inputs, username, password;

			// Initialize.
			inputs = this.getInputs();
			username = inputs.username.value.toLowerCase();
			password = inputs.password.value;

			// Unbind the model.
			this.unBindEventListeners();

			// When username entered matches what is stored
			// save a null value so we can trigger a change
			// event on model.
			if (this.model.get('username') === username) {
				this.model.save({username: null});
			}

			// Lock the login.
			this.lockLogin();

			// Bind the model.
			this.bindEventListeners();

			// Save updated credentials.
			this.model.save({username: username, password: password});
		},

		/**
		Methods sets up the model:{} object for validation.

		@method initModel
		**/
		initModel: function () {
			// Backbone.Validation plugin expects the model to be housed
			// within a model:{} and not the credModel:{}.
			if (_.isEmpty(this.model)) {
				this.model = this.credModel;
			}
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom content for the Login view.

		@method renderContent
		@param {Object} collection Reference to ModuleCollection.
		@override LoadedView
		**/
		renderContent: function (collection) {
			this.initModel();
		},

		/**
		Method overrides the LoadedView class. This method
		provides custom error content for the Login view.

		@method renderError
		@override LoadedView
		**/
		renderError: function () {
			this.initModel();
			var username = this.model.get('username');
			if (username === 'guest') {
				return;
			}

			this.warn('show', this.messages.loginError);
		},

		/**
		Handler for form submission.

		@method submitHandler
		@param {Object} e Event object.
		**/
		submitHandler: function (e) {
			e.preventDefault();
			if (this.loc('submit').hasClass('disabled')) {
				return;
			}

			this.updateCredentials();
		}
	});

})(jQuery, _, Backbone, umobile, config);