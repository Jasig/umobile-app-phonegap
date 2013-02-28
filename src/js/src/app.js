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
	session: {}
};