(function($, umobile, config) {

	/**
	The Module model houses information relating to each
	module or portlet.

	@class Module
	@constructor
	**/
	umobile.model.Module = Backbone.Model.extend({
		/**
		The defaults hash is used to specify the default attributes.

		@property defaults
		@type Object
		**/
		defaults: {
			fname: "fname",
			title: "Title",
			url: "url",
			iconUrl: "imgUrl",
			newItemCount: 0,
			isNative: false
		},

		/**
		Overrides Backbone.sync with umobile.storage.sync method.
		Persists the state of the model to the server.

		@method sync
		**/
		sync: umobile.storage.sync(window["umobile"]["storage"][config.storageFn], "module")
	});

})(jQuery, umobile, config);