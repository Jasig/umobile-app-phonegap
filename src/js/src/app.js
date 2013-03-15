/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */

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
	Namespace for running instance of the umobile application.

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
	Initializes the router for the application.

	@method initRouter
	**/
	initRouter: function () {
		'use strict';
		var router = new umobile.router.RouteManager();
		Backbone.history.start();
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
		this.initRouter();
	},

	/**
	Method sets up listeners for the umobile applicaiton during the bootstrap
	process. The application is currently set up to listen for the deviceready
	event.

	@method initEventListener
	**/
	initEventListener: function () {
		'use strict';
		// Listen to onDeviceReady event.
		document.addEventListener('deviceready', this.onDeviceReady, false);
		if (config.loginFn === 'mockLogin') {
			this.onDeviceReady();
		}
	},

	/**
	Entry point for the umobile application.

	@method initialize
	**/
	initialize: function () {
		'use strict';
		this.initEventListener();
	}
};