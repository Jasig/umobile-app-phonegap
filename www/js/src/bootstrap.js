(function($, _, umobile, config) {

	// Document.ready.
	$(function () {
		/**
		...

		@method getUrlParam
		@private
		**/
		var getUrlParam = function (name) {
			var result = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
			console.log('Get url parameter: ', result);
			return (!result) ? null : result[1] || 0;
		};

		/**
		
		@class bootstrap
		**/
		umobile.bootstrap = {
			app: {},

			/**
			Parses the data returned by the getSession() method.
			Iterates over the layout JSON and adds modules (i.e. portlets)
			to the ModuleCollection based upon the number of portlets
			contained within the JSON feed.

			@method buildModuleCollection
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
							portlet.iconUrl = "images/icons/" + config.nativeIcons[portlet.fname];
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
					'authenticated': this.app.credModel.get("username") ? true : false
				});

				// Update time in the Session Tracker.
				umobile.SessionTracker.set(this.app.stateModel.get('lastSessionAccess'));

				// Save the collection.
				this.app.moduleCollection.save({
					success: function () {}
				});
			},

			/**
			Login a user with the configured login function.
			Data pertaining to a user and thier layout is made
			available when successful.

			@method getSession
			**/
			getSession: function () {
				var loginFn = umobile.auth[config.loginFn];
				loginFn(
					this.app.credModel,
					_.bind(function (data) {
						console.log("Rendering response for user: " + data.user);
						this.buildModuleCollection(data);
					}, this),
					_.bind(function (jqXHR, textStatus, errorThrown) {
						console.log('Error: ' + textStatus + ', ' + errorThrown);
					}, this)
				);
			},

			/**
			Success handler for the Credential request.

			@method credSuccessHandler
			**/
			credSuccessHandler: function (model, response, options) {
				umobile.SessionTracker.get(_.bind(function (time) {
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
					// Or fetch a collection of modules from an existing session and render
					// the application.
					now = (new Date()).getTime();
					lastSession = Number(this.app.stateModel.get('lastSessionAccess'));
					if ((now - lastSession) < (1000*60*10)) {
						this.app.moduleCollection.fetch({
							success: function () {}
						});
					} else {
						this.getSession();
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
			When triggered, the onDeviceReady() method renders a
			loader to end users, inializes the main application
			view and starts the process of requesting data.

			@method onDeviceReady
			**/
			onDeviceReady: function () {
				// Show loader.
				$.mobile.showPageLoadingMsg("a", "Loading modules");

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
			Adds the 'deviceready' event listener to the document.
			When triggered, the onDeviceReady() method is called.

			@method initEventListener
			**/
			initEventListener: function () {
				document.addEventListener("deviceready", this.onDeviceReady, false);
				if (config.loginFn === 'mockLogin') {
					this.onDeviceReady();
				}
			},

			/**
			Initializes the Session and Credential models
			as well as the ModuleList collection during the
			bootstrap phase.

			@method initModels
			**/
			initModels: function () {
				this.app = umobile.app;
				this.app.stateModel = new umobile.model.State();
				this.app.moduleCollection = new umobile.collection.ModuleCollection();
				this.app.credModel = new umobile.model.Credential();
			},

			/**
			Entry point for the umobile application.
			Kicks off the bootstrap process.

			@method init
			**/
			initialize: function () {
				_.bindAll(this);
				this.initModels();
				this.initEventListener();
			}
		};

		umobile.bootstrap.initialize();
		console.log('umobile: ', umobile.app);
	});

})(jQuery, _, umobile, config);