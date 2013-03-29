/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, Handlebars:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages the Credential view.

	@class Credential
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Credential = Backbone.View.extend({
		/**
		HTML tag name used to build a Credential view.

		@property tagName
		@type String
		**/
		tagName: 'div',

		/**
		Class name that is added to the tagName
		when building a Credential view.

		@property className
		@type String
		**/
		className: '',

		/**
		Object hash of valid DOM selectors for
		the Credential view.

		@property selectors
		@type Object
		**/
		selectors: {
			template: '#views-partials-login',
			username: 'input[name=username]',
			password: 'input[name=password]'
		},

		/**
		Template for the Credential view.

		@property template
		@type Object
		**/
		template: {},

		/**
		Backbone events object.

		@property events
		@type Object
		**/
		events: {
			'submit form': 'submitHandler',
			'click .logout-button': 'logoutHandler'
		},

		/**
		Credential model. Represents user credential state.

		@property model
		@type Object
		**/
		model: {},

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
			this.model.save({username: username.val(), password: password.val()}, {silent: false});
			this.model.change();
		},

		/**
		Method clears the username and password input fields on the
		login form and persists null values for the username and password
		on the Credential model. Triggers a change event on the Credential model.

		@method logout
		@param {Object} form jQuery-wrapped form element.
		**/
		logout: function (form) {
			// Define
			var username = form.find(this.selectors.username).val(''),
				password = form.find(this.selectors.password).val('');

			this.model.save({username: null, password: null});
		},

		/**
		Handler for the logout button on the Credential view.

		@method logoutHandler
		@param {Object} e Event object.
		**/
		logoutHandler: function (e) {
			e.preventDefault();
			var form = $(e.target).closest('form');
			this.logout(form);
		},

		/**
		Handler for the update button on the Credential view.

		@method submitHandler
		@param {Object} e Event object.
		**/
		submitHandler: function (e) {
			e.preventDefault();
			var form = $(e.target).closest('form');
			this.updateCredentials(form);
		},

		/**
		Helper method. Given the passed property, this method
		parses the selector object looking for a match.

		@method loc
		@param {String} property The property to look up.
		@return {Object} Cached, jQuery-wrapped DOM element.
		**/
		loc: function (property) {
			if (!this.selectors.hasOwnProperty(property)) {
				throw new Error('The property, ' + property + ' is not a valid selector.');
			}

			return this.$(this.selectors[property]);
		},

		/**
		Method renders the UI for the Credential view.

		@method render
		@return {Object} Credential view.
		**/
		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},

		/**
		Entry point for the Credential view.
		Method is called when the view is first created.

		@method initialize
		@param {Object} options Object hash of options.
		**/
		initialize: function (options) {
			_.bindAll(this);
			this.model = options.model;
			Backbone.Validation.bind(this);
			this.template = Handlebars.compile($(this.selectors.template).html());

			// Bind to model. Valid model callback.
			this.model.bind('validated:valid', function (model) {
				//
			});

			// Bind to model. Invalid model callback.
			this.model.bind('validated:invalid', function (model, errors) {
				//
			});
		}
	});

})(jQuery, _, umobile, config);