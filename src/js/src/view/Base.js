/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, console:true, Handlebars:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	Class abstraction. Defines properties and methods
	that all views require.

	@class Base
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Base = Backbone.View.extend({
		/**
		Property houses DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {},

		/**
		Property houses compiled handlebar template.

		@property template
		@type Object
		**/
		template: {},

		/**
		Property houses collection of modules.

		@property moduleCollection
		@type Object
		**/
		moduleCollection: {},

		/**
		Property houses the Credential model.

		@property credModel
		@type Object
		**/
		credModel: {},

		/**
		Property houses the State model.

		@property stateModel
		@type Object
		**/
		stateModel: {},

		/**
		Property houses binding to $.publish method.

		@property publish
		@type Object
		**/
		publish: _.bind($.publish, this),

		/**
		Property houses binding to $.subscribe method.

		@property subscribe
		@type Object
		**/
		subscribe: _.bind($.subscribe, this),

		/**
		Property houses binding to $.unsubscribe method.

		@property unsubscribe
		@type Object
		**/
		unsubscribe: _.bind($.unsubscribe, this),

		/**
		Property houses utilty implementation.

		@property utils
		@type Object
		**/
		utils: {},

		/**
		Helper method. Given the passed property, this method
		parses the selector object looking for a match.

		@method loc
		@param {String} property The property to look up.
		@param {Boolean} isRoot Flag to search for property on the body tag.
		@return {Object} Cached, jQuery-wrapped DOM element.
		**/
		loc: function (property, isRoot) {
			var scope;
			if (isRoot && typeof isRoot !== 'boolean') {
				throw new Error('Unsupported type. Expected boolean for isRoot argument and not ' + typeof isRoot + '.');
			}

			scope = (isRoot) ? $('body') : this.$el;
			return scope.find(this.selectors[property]);
		},

		/**
		Method provides generic rendering of templates.

		@method render
		@return {Object} Reference to the Header view.
		**/
		render: function () {
			var model = (this.options.hasOwnProperty('model')) ? this.options.model : {};
			this.$el.html(this.template(model));
			return this;
		},

		/**
		Method is triggered when the Module Collection is reset.
		This method is meant to be implemented by child views.

		@method onCollectionReset
		@param {Object} collection Collection of module objects.
		**/
		onCollectionReset: function (collection) {},

		/**
		Method is triggered when the Credential Model is updated.
		This method is meant to be implemented by child views.

		@method onCredChanged
		@param {Object} model The updated model.
		**/
		onCredChanged: function (model) {},

		/**
		Method is triggered when the route changes.
		This method is meant to be implemented by child views.

		@method onRouteChanged
		@param {Object} view The current view.
		**/
		onRouteChanged: function (view) {},

		/**
		Method is triggered when the DOM is ready.
		This method is meant to be implemented by child views.

		@method onReady
		**/
		onReady: function () {},

		/**
		Method provides custom clean-up operations for child views.
		This method is meant to be implemented by child views.

		@method clean
		**/
		clean: function () {},

		/**
		Method cleans up the DOM and unbinds
		events when the loaded view changes.

		@method destroy
		**/
		destroy: function () {
			// Unbind models, collections & listners.
			this.unbind();
			this.moduleCollection.off('reset', this.onCollectionReset, this);
			this.credModel.off('change', this.onCredChanged, this);
			this.unsubscribe('route.changed', this.onRouteChanged);

			// Undelegate events.
			this.undelegateEvents();

			// Custom removal.
			if (this.clean && _.isFunction(this.clean)) {
				this.clean();
			}

			// Remove DOM.
			this.remove();
		},

		/**
		Method initializes the view.

		@method initialize
		@param {Object} options Options object.
		**/
		initialize: function (options) {
			// Bind all properties & methods.
			_.bindAll(this);

			// Cache module collection.
			this.moduleCollection = umobile.app.moduleCollection;

			// Cache credential model.
			this.credModel = umobile.app.credModel;

			// Cache state model.
			this.stateModel = umobile.app.stateModel;

			// Cache utilities.
			this.utils = umobile.utility.Utils;

			// Cache options.
			this.options = (options && !_.isEmpty(options)) ? options : {};

			/**
			 * Translation method
			 *
			 * {{t 'foo.bar'}} 
			 * "foo.bar" : "Hello" will output "Hello"
			 *
			 * ---
			 * 
			 * {{t 'foo.bar' 2}} will pluralize foo.bar value if possible
			 * 
			 * "foo.bar" : "%{smart_count} car |||| %{smart_count} cars" 
			 * will output "2 cars"
			 *
			 * Learn more about pluralization in Polyglot.js
			 * <http://airbnb.github.io/polyglot.js/polyglot.html#section-12>
			 * 
			 * ---
			 * 
			 * {{t 'foo.bar' 'John' 'Doe'}} will do the same as the first example but will change
			 * %{0} with 'John' and %{1} with 'Doe'
			 *
			 * "foo.bar" : "My name is %{0} %{1}" will output : "My name is John Doe"
			 *
			 *
			 * Check <http://airbnb.github.io/polyglot.js/polyglot.html> for more informations 
			 */
			Handlebars.registerHelper('t', function(str) {

				// If param is a number, then it is done for 
				if(arguments.length > 1 && !isNaN(arguments[1])) {
					var smartCount = parseInt(arguments[1], 10);
					return umobile.i18n.t(str, smartCount);
				}

				var params = {};
				for(var i=1; i<arguments.length; i++) {
					params[i-1] = arguments[i];
				}

				return umobile.i18n.t(str, params);
			});

			// Compile screen template.
			this.template = Handlebars.compile($(this.selectors.template).html());

			// Listen to the reset event on the moduleCollection.
			this.moduleCollection.on('reset', this.onCollectionReset, this);

			// Listen for the 'change' event on the credential model.
			this.credModel.on('change', this.onCredChanged, this);

			// Listen for the 'route.changed' event.
			this.subscribe('route.changed', this.onRouteChanged, this);
			this.onReady();
		}
	});

})(jQuery, _, Backbone, umobile, config);