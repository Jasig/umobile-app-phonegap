/*global window:true, _:true, document:true, jQuery:true, umobile:true, config:true, console:true */
(function ($, _, umobile, config) {
	'use strict';

	/**
	Houses resource methods associated with obtaining a new background.

	@class Background
	@submodule resource
	@namespace resource
	**/
	umobile.resource.Background = {

		backgroundChangerScript: null,


		/**
		Method...

		@method getBackground
		**/

		/**
		 * This method makes the AJAX call to retrieve the background changer portlet
		 * and then passes it off to the appropriate handler methods.
		 * @param  {string} url The URL from the layout.json for the background portlet
		 */
		getBackground: function (url) {
			// This is for future enhancement once the background changer script is moved to an external file
			// in the portlet.
			//
			// umobile.utility.Utils.loadScript('http://unicon.dev/ThirdPartyJS/backgroundChanger.js', function () {
			//	console.log('script added');
			// });
			
			// Reference to the Background object
			var self = this;

			// Makes the call to retrieve the background changer portlet.
			$.ajax({
				url: url,
				dataType: 'html',
				type: 'GET',
				success: function (data, textStatus, jqXHR) {
					// Call the extractBackgroundComponents method and store the data.
					data = self.extractBackgroundComponents(data);

					// Fire the "background_retrieved" event passing it the data.
					$.publish('background_retrieved', {content: data});
				},
				error: function (jqXHR, textStatus, errorThrown) {
					// Call the background_retrieve_failure method
					$.publish('background_retrieved_failure');
				}
			});
		},

		/**
		 * Method to extract the various pieces needed for displaying the background
		 * changer portlet in the mobile view.  It extracts the actual HTML code and
		 * the script needed to handle the display of image choices.
		 * @param  {string} data A HTML string fromt he Background Changer portlet containing the HTML and SCRIPT
		 * @return {string}      Returns the HTML portion of the data to be injected into the mobile app.
		 */
		extractBackgroundComponents: function (data) {
			// Create a local reference to hold the data.
			var dom = $(data);
			
			// Find the actual HTML code for the background changer ui.
			var backgroundDiv = dom.filter('#portalPage').find('div.up-portlet-content-wrapper-inner');
			// var backgroundDiv = dom.filter('div.up-portlet-content-wrapper-inner');

			// Grab the script to handle the background changer events and toggling the menu
			// and place it in a local store.  Note: this is not ideal and will be refactored in future versions.
			this.backgroundChangerScript = dom.filter('script#backgroundScript').text();
			//this.backgroundChangerScript = dom.filter('script#thirdPartyJS').text();
			
			return backgroundDiv;
		},

		/**
		 * Execute the extracted script since it does not get executed automatically
		 */
		executeBackgroundScript: function () {
			if (this.backgroundChangerScript && this.backgroundChangerScript !== '') {
				$.globalEval(this.backgroundChangerScript);
			}
		},

		/**
		 * Set the selected background image in the UI.
		 */
		setBackgroundImage: function () {
			var imgUri = $('input.background-value')[0].value;
			var html = $('html');

			if (imgUri) {
				console.log('updateBackground Image');
				$('body, .dm-dashboard').css('background-color', 'transparent');
				html.css({'background': 'url(' + imgUri + ')'});
			} else {
				console.log('clear the background');
				html.css({'background': ''});
			}
		}
	};

})(jQuery, _, umobile, config);