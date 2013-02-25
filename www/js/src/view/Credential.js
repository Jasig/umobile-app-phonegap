(function($, umobile, config) {

	/**
	Manages the Credential view.

	@class Credential
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
			template: '#auth-template',
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
			"submit form": "updateCredentials",
			"click .logout-button": "logout"
		},

		/**
		Credential model. Represents user credential state.

		@property credModel
		@type Object
		**/
		credModel: {},

		/**
		...

		@method updateCredentials
		**/
		updateCredentials: function () {
			this.model.save({ username: this.usernameInput.val(), password: this.passwordInput.val() }, { silent: true });
			this.model.change();
		},

		/**
		...

		@method logout
		**/
		logout: function () {
			this.usernameInput = this.$("input[name=username]").val("");
			this.passwordInput = this.$("input[name=password]").val("");
			this.model.save({ username: null, password: null });
			console.log("Logging out");
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
		Renders the UI for the Credential view.

		@method render
		@return {Object} Credential view.
		**/
		render: function () {
			this.$el.html(this.template(this.credModel.attributes));
			return this;
		},

		/**
		Entry point for the Credential view.
		Initialize is called when the view is first created.

		@method initialize
		@param {Object} options Object hash of options.
		**/
		initialize: function (options) {
			_.bindAll(this);
			this.credModel = options.model;
			this.template = Handlebars.compile($(this.selectors.template).html());
		}
	});

})(jQuery, umobile, config);