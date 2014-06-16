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
	Namespace for the umobile resource implementation.
	@submodule resource
	@namespace resource
	**/
	resource: {},

	/**
	Namespace for umobile utilities.

	@submodule utility
	@namespace utility
	**/
	utility: {},

	/**
	Namespace for umobile i18n.

	@submodule i18n
	@namespace i18n
	**/
	i18n: {},

	/**
	Method parses the data received by the session.established event.
	Iterates over layout JSON and adds modules (i.e. portlets) to
	the modues array based upon the number of portlets described
	by the JSON feed. The modules array is then returned.

	@method buildModuleArray
	@param {Object} data Object containing layout and portlet information.
	@return {Array} modules Array of module objects.
	**/
	buildModuleArray: function (data) {
		'use strict';
		// Define.
		var modules, folders, headers;

		// Initialize.
		modules = [];
		folders = (data && !_.isEmpty(data)) ? data.layout.folders : {};
		headers = (data && !_.isEmpty(data) && !_.isEmpty(data.layout.header)) ? data.layout.header.portlets : {};
		// Iterate over Headers
		// We need to iterate over the headers section of the JSON in order to get
		// the information for the background changer implementation
		_.each(headers, function (header, index) {
			if (header.hasOwnProperty('fname') && header.fname === 'background-preference') {
				umobile.resource.Background.getBackground(header.url);
			}
		});

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
					portlet.isNative = false;
				}

				// Define hasNewItem property based upon the newItemCount property.
				portlet.hasNewItem = (!Number(portlet.newItemCount)) ? false : true;

				// Truncate portlet title.
				portlet.fullTitle = portlet.title;
				portlet.title = umobile.utility.Utils.truncate(portlet.title);

				modules.push(new umobile.model.Module(portlet));
			}, this);
		}, this);

		return modules;
	},

	/**
	Method leverages the SessionTracker plugin to determine
	whether or not a valid session still exists.

	@method checkSession
	**/
	checkSession: function () {
		'use strict';
		umobile.session.SessionTracker.get(_.bind(function (time) {

			// Define.
			var now, lastSession, sessionTimeout;

			// Update the 'lastSessionAccess' property.
			if (time !== 0) {
				umobile.app.stateModel.save({lastSessionAccess: time});
			}

			// Determine if our session has expired.
			now = Number((new Date()).getTime());
			lastSession = Number(umobile.app.stateModel.get('lastSessionAccess'));
			sessionTimeout = Number(config.sessionTimeout);

			// When session exists, fetch modules from module collection.
			// When the session has expired, attempt to re-establish a session.
			if ((now - lastSession) < sessionTimeout) {
				umobile.app.moduleCollection.fetch();
			} else {
				umobile.auth.establishSession();
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
		umobile.app.stateModel.fetch({
			success: _.bind(function (stateModel) {
				umobile.app.credModel.fetch({
					success: _.bind(function (credModel) {
						umobile.checkSession();
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
		umobile.app.router = new umobile.router.RouteManager();
		Backbone.history.start();
	},

	/**
	Method initializes the State and Credential models as well as
	the Module collection during the bootstrap phase.

	@method initModels
	**/
	initModels: function () {
		'use strict';
		umobile.app.stateModel = new umobile.model.State();
		umobile.app.credModel = new umobile.model.Credential();
		umobile.app.moduleCollection = new umobile.collection.ModuleCollection();
	},

	/**
	 * Method initializes the i18n module 
	 *
	 * @method initI18n
	 */
	initI18n : function() {
		'use strict';

		umobile.i18n = new Polyglot({ allowMissing : true });
		var locale = config.locale || umobile.i18n.locale();

		$.get(config.messages[locale]).done(function(data) {
			umobile.i18n.extend(data);
			umobile.initRouter();
		});
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
			// Define.
			var modules;

			// Update credentials.
			umobile.app.credModel.save({username: data.user});

			// Update state.
			umobile.app.stateModel.save({
				lastSessionAccess: (new Date()).getTime(),
				authenticated: (umobile.app.credModel.get('username')) ? true : false
			});

			// Build module array.
			// Populate the collection with modules.
			modules = umobile.buildModuleArray(data);
			umobile.app.moduleCollection.reset(modules);
			umobile.app.moduleCollection.save();

			// Update time in the Session Tracker.
			umobile.session.SessionTracker.set(umobile.app.stateModel.get('lastSessionAccess'));

			// Redirect user to dashboard.
			umobile.app.router.navigate('dashboard', {trigger: true});
		}, this));

		// Subscribe to 'session.failure' event.
		$.subscribe('session.failure', _.bind(function () {
			umobile.app.moduleCollection.reset({});

			// Direct users to the login screen.
			umobile.app.router.navigate('login', {trigger: true});
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

		umobile.initEventListeners();
		umobile.initModels();
		umobile.initI18n();
		umobile.updateAppState();
	},

	/**
	Entry point for the umobile application.
	Registers the PhoneGap deviceready event.

	@method initialize
	**/
	initialize: function () {
		'use strict';
		// Check if uMobile is running on Cordova/Phonegap
		if((window.cordova || window.PhoneGap || window.phonegap) && /^file:\/{3}[^\/]/i.test(window.location.href)) {
			// Listen to onDeviceReady event.
			document.addEventListener('deviceready', umobile.onDeviceReady, false);
		} else {
			umobile.onDeviceReady();
		}
	}
};