/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Manages the main application view.

	@class App
	@submodule view
	@namespace view
	@constructor
	**/
	umobile.view.App = Backbone.View.extend({
		/**
		Root DOM element.

		@property el
		@type Object
		**/
		el: '#appView',

		/**
		Object hash of valid DOM selectors.

		@property selectors
		@type Object
		**/
		selectors: {
			invitation: '.umobile-auth-invitation',
			nav: '.portal-nav',
			module: '#module',
			pref: '#preference'
		},

		/**
		Collection of modules.

		@property moduleCollection
		@type Object
		**/
		moduleCollection: {},

		/**
		Credential model. Represents user credential state.

		@property credModel
		@type Object
		**/
		credModel: {},

		/**
		State model. Represents user state.

		@property stateModel
		@type Object
		**/
		stateModel: {},

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
		Method is triggered whenever a user's credentials
		are updated. When triggered, this method directs
		users to the home screen and makes a request to
		retrieve layout data for the updated credentials.

		@method onUpdateCredentials
		**/
		onUpdateCredentials: function () {
			$.mobile.changePage('#home', {transition: 'none'});
			$.mobile.showPageLoadingMsg('a', 'Loading modules');
			umobile.auth.getSession();
		},

		/**
		Method directs user to the current view when a user is unauthenticated
		and the current view is not the home screen.

		@method directToCurrentView
		**/
		directToCurrentView: function () {
			var userName = this.credModel.get('username'),
				authenticated = this.stateModel.get('authenticated'),
				currentView = this.stateModel.get('currentView'),
				modules;

			if ((!userName || !authenticated) && (currentView && currentView !== 'home')) {
				modules = this.moduleCollection.models;
				_.each(modules, function (module, idx) {
					if (module.get('fname') === this.stateModel.get('currentView')) {
						$.publish('module.selected', module);
					}
				}, this);
			}
		},

		/**
		Renders the preferences view.

		@method renderPreferences
		**/
		renderPreferences: function () {
			// Define & initialize.
			var preference = this.loc('pref'),
				authView = new umobile.view.Credential({
					model: this.credModel
				});

			// Render authentication template into preferences.
			preference.find('.portlet-content').html(authView.render().el);
		},

		/**
		Renders the footer on the home screen.

		@method renderFooter
		**/
		renderFooter: function () {
			var footer = this.$(this.selectors.invitation);
			if (!this.stateModel.get('authenticated')) {
				footer.show();
			} else {
				footer.hide();
			}
		},

		/**
		Render modules or portlets to the UI.

		@method renderModules
		**/
		renderModules: function (collection) {
			// Define & initialize.
			var nav = this.loc('nav').html(''),
				modules = collection.models || this.moduleCollection.toJSON();

			// Iterate over modules and initialize each module view.
			_.each(modules, function (module, idx) {
				var moduleView = new umobile.view.Module({
					model: module
				});
				nav.append(moduleView.render().el);
			}, this);
		},

		/**
		Renders the UI for the App view.

		@method render
		@param {Array} collection Collection of modules.
		**/
		render: function (collection) {
			// Build modules.
			this.renderModules(collection);

			// Build footer.
			this.renderFooter();

			// Build preferences.
			this.renderPreferences();

			// Direct to current view.
			this.directToCurrentView();

			// Hide loader.
			$.mobile.hidePageLoadingMsg();
		},

		/**
		Updates the UI with the selected module or portlet.

		@method updateModuleView
		@param {Object} module Module model.
		**/
		updateModuleView: function (module) {
			// Define & initialize.
			var element = this.loc('module'),
				title = element.find('.title'),
				frame = element.find('iframe');

			// Update module title and frame source.
			title.text(module.attributes.title);
			frame.attr('src', module.attributes.url);

			// Transition to the selected module.
			$.mobile.changePage('#module', {transition: 'none'});

			// Update state with current view.
			this.stateModel.save({currentView: module.get('fname')});
		},

		/**
		Entry point for the App view.
		Initialize is called when the view is first created.

		@method initialize
		**/
		initialize: function () {
			// Cache module collection.
			this.moduleCollection = umobile.app.moduleCollection;

			// Cache credential model.
			this.credModel = umobile.app.credModel;

			// Cache state model.
			this.stateModel = umobile.app.stateModel;

			// Listen for the module collection to be reset.
			// When it is, execute the render method.
			this.moduleCollection.on('reset', _.bind(function (collection, options) {
				this.render(collection);
			}, this));

			// Listen for the 'change' event on a user's credentials.
			this.credModel.on('change', _.bind(function () {
				this.onUpdateCredentials();
			}, this));

			// Subscribe to the 'module.selected' event for the selection of a module.
			$.subscribe('module.selected', _.bind(function (module) {
				this.updateModuleView(module);
			}, this));
		}
	});

})(jQuery, _, umobile, config);