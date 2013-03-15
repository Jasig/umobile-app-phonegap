/*global window:true, _:true, Backbone:true, jQuery:true, umobile:true, config:true, Handlebars:true, console:true */
(function ($, _, Backbone, umobile, config) {
	'use strict';

	/**
	...

	@class Screen
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.Screen = Backbone.View.extend({
		/**
		Root DOM element.

		@property el
		@type Object
		**/
		el: '#screen',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {},

		/**
		Houses the compiled handlebar template
		for a screen.

		@property template
		@type Object
		**/
		template: {},

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
		Method cleans up the DOM and unbinds
		events when a screen is removed.

		@method close
		**/
		close: function () {
			// Clean up the DOM and DOM events.
			this.remove();
			$('#page').prepend(this.$el);

			// Unbind any events that our view triggers.
			this.unbind();
		},

		/**
		Method shows the loading mask when switching screens.

		@method showLoader
		**/
		showLoader: function () {
			var loader = $('#loader');
			loader.show();
		},

		/**
		Method hides the loading mask when switching screens.

		@method hideLoader
		**/
		hideLoader: function () {
			var loader = $('#loader');
			loader.fadeOut();
		},

		/**
		Method renders the UI for all screens.

		@method render
		@return {Object}
		**/
		render: function () {
			this.showLoader();
			this.$el.addClass('hidden')
				.html(this.template({}))
				.removeClass('hidden');
			this.hideLoader();
			return this;
		},

		/**
		Entry point for all screens.
		Method is called when a screen is first created.

		@method initialize
		@param {Object} options Object hash of options.
		**/
		initialize: function (options) {
			_.bindAll(this);
			this.template = Handlebars.compile($(this.selectors.template).html());
		}
	});

})(jQuery, _, Backbone, umobile, config);