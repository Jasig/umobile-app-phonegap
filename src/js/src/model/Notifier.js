/*global window:true, document:true, jQuery:true, _:true, umobile:true, config:true, Backbone:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	The Notifier model houses information pertaining to the Notifier view.
	It contains title and message content to be rendered to the end user.

	@class Notifier
	@submodule model
	@namespace model
	@constructor
	**/
	umobile.model.Notifier = Backbone.Model.extend({
		/**
		Property houses default model attributes.

		Values are keys referring to i18n datas

		@property defaults
		@type Object
		**/
		defaults: {
			title: 'notifier.title',
			message: 'notifier.message'
		}
	});

})(jQuery, _, umobile, config);