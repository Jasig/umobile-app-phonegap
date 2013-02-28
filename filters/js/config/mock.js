// Configuration object.
var config = {};
// BASE SERVER URL
config.uMobileServerUrl = 'http://localhost:5000';

// UMOBILE SERVER CONTEXT PATH
config.uMobileServerContext = '/data';

// AUTHENTICATION
config.loginFn = 'mockLogin';
config.encryptionKey = 'umobile';
config.casServerUrl = 'http://localhost:8080';

// LOCAL STORAGE.
config.storageFn = 'local';

// LOCALLY HOSTED ICONS
// For uMobile modules. Keyed by module fname.
config.nativeIcons = {
	athletics: 'athletics.png',
	announcements: 'bullhorn.png',
	calendar: 'calendar.png',
	'computer-labs': 'computer_lab.png',
	courses: 'courses.png',
	dining: 'dining.png',
	directory: 'directory.png',
	laundry: 'laundry.png',
	library: 'library.png',
	map: 'map.png',
	news: 'feed.png',
	presentations: 'opencast.png',
	search: 'search.png',
	stats: 'stats.png',
	transit: 'transit.png',
	twitter: 'twitter.png',
	videos: 'youtube.png',
	weather: 'weather.png',
	info: 'default-icon.png'
};

// SUPPORTED MODULES
config.nativeModules = {
	map: 'map.html'
};