/*global window:true, document:true, $:true, _:true, umobile:true, config:true, Backbone:true, console:true */

/**
Main module for the umobile application. Namespaces
all source logic to the umobile namespace. Houses the
app, bootstrap, model, collection, view, auth and storage
submodules.

@module umobile
@namespace umobile
@main umobile
**/
var umobile = {
	/**
	Namespace for running instances that are needed across the
	umobile application.

	@submodule app
	@namespace app
	**/
	app: {},

	/**
	Namespace for umobile model implementations.
	Houses the Credential, Module and State model
	implementations.

	@submodule model
	@namespace model
	**/
	model: {},

	/**
	Namespace for umobile collection implementations.
	Houses the Module collection implementation.

	@submodule collection
	@namespace collection
	**/
	collection: {},

	/**
	Namespace for umobile view implementations.
	Houses the App, Credential and Module view
	implementations.

	@submodule view
	@namespace view
	**/
	view: {},

	/**
	Namespace for umobile router implementation.

	@submodule router
	@namespace router
	**/
	router: {},

	/**
	Namespace for the umobile authentication implementation.

	@submodule auth
	@namespace auth
	**/
	auth: {},

	/**
	Namespace for the umobile storage implementation.

	@submodule storage
	@namespace storage
	**/
	storage: {},

	/**
	Namespace for the umobile session implementation.

	@submodule session
	@namespace session
	**/
	session: {},

	/**
	Method parses the data received by the session.established event.
	Iterates over layout JSON and adds modules (i.e. portlets) to
	the ModuleCollection based upon the number of portlets described
	by the JSON feed.

	@method buildModuleCollection
	@param {Object} data Object containing layout and portlet information.
	**/
	buildModuleCollection: function (data) {
		'use strict';
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

				// Define hasNewItem property based upon the newItemCount property.
				portlet.hasNewItem = (!Number(portlet.newItemCount)) ? false : true;

				modules.push(new this.model.Module(portlet));
			}, this);
		}, this);

		// Add all modules to the module collection.
		this.app.moduleCollection.reset(modules);

		// Save the collection.
		this.app.moduleCollection.save();
	},

	/**
	Method searches the URL for the given name argument.

	@method getUrlParam
	@param {String} name Parameter to search for on the URL.
	@return {String} URL parameter.
	**/
	getUrlParam: function (name) {
		'use strict';
		var result = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return (!result) ? null : result[1] || 0;
	},

	/**
	Method leverages the SessionTracker plugin to determine
	whether or not a valid session still exists.

	@method checkSession
	**/
	checkSession: function () {
		'use strict';
		this.session.SessionTracker.get(_.bind(function (time) {
			var view, module, now, lastSession, sessionTimeout;

			// Search the url for the module parameter.
			// Update the 'currentView' property.
			module = this.getUrlParam('module');
			view = (module) ? module : 'home';
			this.app.stateModel.save({currentView: view});

			// Update the 'lastSessionAccess' property.
			if (time !== 0) {
				this.app.stateModel.save({lastSessionAccess: time});
			}

			// Determine if our session has expired.
			now = Number((new Date()).getTime());
			lastSession = Number(this.app.stateModel.get('lastSessionAccess'));
			sessionTimeout = Number(config.sessionTimeout);

			// When session exists, fetch modules from module collection.
			// When the session has expired, attempt to re-establish a session.
			if ((now - lastSession) < sessionTimeout) {
				this.auth.establishSession();
				//this.app.moduleCollection.fetch();
			} else {
				this.auth.establishSession();
			}
		}, this));
	},

	/**
	Method updates the State and Credential models. This
	interaction happens behind the scenes. For both models,
	the fetch method searches the storage implemenation for
	existing state. If found, the existing state is used to
	update the models. If not found, the default state of each
	model is preserved.

	@method updateAppState
	**/
	updateAppState: function () {
		'use strict';
		this.app.stateModel.fetch({
			success: _.bind(function (stateModel) {
				this.app.credModel.fetch({
					success: _.bind(function (credModel) {
						this.checkSession();
					}, this)
				});
			}, this)
		});
	},

	/**
	Initializes the router for the application.

	@method initRouter
	**/
	initRouter: function () {
		'use strict';
		var router = new umobile.router.RouteManager();
		Backbone.history.start();
	},

	/**
	Method initializes the State and Credential models as well as
	the Module collection during the bootstrap phase.

	@method initModels
	**/
	initModels: function () {
		'use strict';
		this.app.stateModel = new umobile.model.State();
		this.app.credModel = new umobile.model.Credential();
		this.app.moduleCollection = new umobile.collection.ModuleCollection();
	},

	/**
	Method registers subscribed events.

	@method initEventListeners
	**/
	initEventListeners: function () {
		'use strict';

		// Subscribe to 'session.established' event.
		// When triggered, updates the State model and SessionTracker.
		$.subscribe('session.established', _.bind(function (data) {
			this.buildModuleCollection(data);

			// Update state.
			this.app.stateModel.save({
				lastSessionAccess: (new Date()).getTime(),
				authenticated: (this.app.credModel.get('username')) ? true : false
			});

			// Update time in the Session Tracker.
			this.session.SessionTracker.set(this.app.stateModel.get('lastSessionAccess'));
		}, this));
	},

	/**
	The deviceready event is a part of the PhoneGap API. This is a very important
	event that every PhoneGap application should use. PhoneGap consists of two code
	bases: native and JavaScript. While the native code is loading, a custom loading
	image is displayed. However, JavaScript is only loaded once the DOM loads. This
	means the application could, potentially, call a PhoneGap JavaScript function
	before it is loaded.

	The PhoneGap deviceready event fires once PhoneGap has fully loaded. After the
	device has fired, you can safely make calls to PhoneGap function.

	@method onDeviceReady
	**/
	onDeviceReady: function () {
		'use strict';
		this.initEventListeners();
		this.initModels();
		this.initRouter();
		this.updateAppState();
	},

	/**
	Entry point for the umobile application.
	Registers the PhoneGap deviceready event.

	@method initialize
	**/
	initialize: function () {
		'use strict';
		// Listen to onDeviceReady event.
		document.addEventListener('deviceready', this.onDeviceReady, false);
		if (config.loginFn === 'mockLogin') {
			this.onDeviceReady();
		}
	}
};