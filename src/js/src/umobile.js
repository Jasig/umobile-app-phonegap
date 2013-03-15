/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	// Document.ready.
	$(function () {

		/**
		Method searches the URL for the given name argument.

		@method getUrlParam
		@param {String} name Parameter to search for on the URL.
		@return {String} URL parameter.
		@private
		**/
		var getUrlParam = function (name) {
			var result = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
			return (!result) ? null : result[1] || 0;
		};

		/**
		Manages the bootstrap process for the umobile application.

		@class Bootstrap
		@submodule app
		@namespace app
		**/
		umobile.app.bootstrap = {
			/**
			Property stores reference to umobile.app, which houses the
			running instance of the umobile application.

			@property app
			@type Object
			**/
			app: {},

			/**
			Method parses the data received by the session.retrieved event.
			Iterates over layout JSON and adds modules (i.e. portlets) to
			the ModuleCollection based upon the number of portlets described
			by the JSON feed.

			@method buildModuleCollection
			@param {Object} data Object containing layout and portlet information.
			**/
			buildModuleCollection: function (data) {
				// Define.
				var modules, folders;

				// Initialize.
				modules = [];
				folders = data.layout.folders;

				// Iterate over folders.
				_.each(folders, function (folder, idx) {
					var portlets = folder.portlets;

					// Iterate over portlets.
					_.each(portlets, function (portlet, idx) {
						portlet.id = portlet.fname;

						// Parse the config.nativeIcons object for a property
						// that matches the portlet.fname. If one is found, set
						// the icon url to leverage a locally stored icon. If a
						// match is not found, set the icon url to an icon on the
						// server.
						if (config.nativeIcons[portlet.fname]) {
							portlet.iconUrl = 'images/icons/' + config.nativeIcons[portlet.fname];
						} else {
							portlet.iconUrl = config.uPortalServerUrl + portlet.iconUrl;
						}

						// Parse the config.nativeModules object for a property that
						// matches the portlet.fname. If one is found, the module or
						// portlet is natively supported. Set the portlet url to a local
						// implementation (i.e., map.html). Otherwise, set the portlet url
						// to an implementation located on the server.
						if (config.nativeModules[portlet.fname]) {
							portlet.url = config.nativeModules[portlet.fname];
							portlet.isNative = true;
						} else {
							portlet.url = config.uMobileServerUrl + portlet.url;
						}

						modules.push(new umobile.model.Module(portlet));
					}, this);
				}, this);

				// Add all modules to the module collection.
				this.app.moduleCollection.reset(modules);

				// Update state.
				this.app.stateModel.save({
					'lastSessionAccess': (new Date()).getTime(),
					'authenticated': this.app.credModel.get('username') ? true : false
				});

				// Update time in the Session Tracker.
				umobile.session.SessionTracker.set(this.app.stateModel.get('lastSessionAccess'));

				// Save the collection.
				this.app.moduleCollection.save({
					success: function () {}
				});
			},

			/**
			Success handler for the Credential request. Method checks the backend session
			access tracker. If the session tracker is non-zero, this method updates the application
			state with the value from the session tracker. This method also checks the application
			state for the last session access timestamp. If a timestamp is present and is within
			session length, this method assumes a valid session and skips authentication. Otherwise,
			the authentication process is started.

			@method credSuccessHandler
			**/
			credSuccessHandler: function (model, response, options) {
				umobile.session.SessionTracker.get(_.bind(function (time) {
					var module, now, lastSession;

					// Search the url for the module parameter.
					// If found, update the 'currentView' property.
					module = getUrlParam('module');
					if (module) {
						this.app.stateModel.save('currentView', module);
					}

					// Update the 'lastSessionAccess' property.
					if (time !== 0) {
						this.app.stateModel.save('lastSessionAccess', time);
					}

					// Fetch list of modules from the server and render the application.
					// Or fetch a collection of modules from an existing session and render.
					now = (new Date()).getTime();
					lastSession = Number(this.app.stateModel.get('lastSessionAccess'));
					if ((now - lastSession) < (1000 * 60 * 10)) {
						this.app.moduleCollection.fetch({success: function () {}});
					} else {
						umobile.auth.getSession();
					}
				}, this));
			},

			/**
			Generic error handler for failed requests.

			@method errorHandler
			**/
			errorHandler: function (model, xhr, options) {
				console.log('Error: ' + model + ', ' + xhr);
			},

			/**
			When triggered, method renders a loader to end users,
			initializes the main application view and starts the
			data retrieval process.

			@method onDeviceReady
			**/
			onDeviceReady: function () {
				// Show loader.
				$.mobile.showPageLoadingMsg('a', 'Loading Modules');

				// Initialize the main application view.
				this.app.appView = new umobile.view.App();

				// Fetch state.
				this.app.stateModel.fetch({
					success: _.bind(function (model, response, options) {
						// Fetch credentials.
						this.app.credModel.fetch({
							success: this.credSuccessHandler,
							error: this.errorHandler
						});
					}, this),
					error: this.errorHandler
				});
			},

			/**
			Method sets up listeners for the umobile applicaiton during the bootstrap
			process. The application is currently set up to listen for the deviceready
			event and a custom session.retrieved event.

			Note: The deviceready event is a part of the PhoneGap API. This is a very
			important event that every PhoneGap application should use. PhoneGap consists
			of two code bases: native and JavaScript. While the native code is loading,
			a custom loading image is displayed. However, JavaScript is only loaded once
			the DOM loads. This means the application could, potentially, call a PhoneGap
			JavaScript function before it is loaded.

			The PhoneGap deviceready event fires once PhoneGap has fully loaded. After the
			device has fired, you can safely make calls to PhoneGap function.

			@method initEventListener
			**/
			initEventListener: function () {
				// onDeviceReady event.
				document.addEventListener('deviceready', this.onDeviceReady, false);
				if (config.loginFn === 'mockLogin') {
					this.onDeviceReady();
				}

				// Subscribe to 'session.retrieved' event.
				$.subscribe('session.retrieved', _.bind(function (data) {
					this.buildModuleCollection(data);
				}, this));
			},

			/**
			Method initializes the State and Credential models as well as
			the Module collection during the bootstrap phase.

			@method initModels
			**/
			initModels: function () {
				this.app = umobile.app;
				this.app.stateModel = new umobile.model.State();
				this.app.credModel = new umobile.model.Credential();
				this.app.moduleCollection = new umobile.collection.ModuleCollection();
			},

			/**
			Entry point for the umobile application.
			Method kicks off the bootstrap process.

			@method init
			**/
			initialize: function () {
				//_.bindAll(this);
				//this.initModels();
				//this.initEventListener();
			}
		};

		umobile.app.bootstrap.initialize();
	});

})(jQuery, _, umobile, config);