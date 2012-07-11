var config = {};
        
// base server configuration
config.uMobileServerUrl = "http://10.0.2.2:8080";   // android only, otherwise http://localhost:8080
//config.uMobileServerUrl = "https://umobile.unicon.net";   // android only, otherwise http://localhost:8080
config.uMobileServerContext = "";
config.casServerUrl = "http://localhost:8080";

// authentication
config.loginFn = "localLogin";      // valid choices are localLogin or casLogin
config.encryptionKey = "umobile";

config.storageFn = "local";

// Sample configuration for local HTML5-only testing
config.uMobileServerUrl = "http://localhost/~athena/dev/umobile-app-phonegap/www";
config.uMobileServerContext = "/test-data";
config.loginFn = "mockLogin";

// locally-hosted icons for uMobile modules, keyed by module fname
config.nativeIcons = {
    athletics : 'athletics.png',
    announcements : 'bullhorn.png',
    calendar : 'calendar.png',
    "computer-labs" : 'computer_lab.png',
    courses : 'courses.png',
    dining : 'dining.png',
    directory : 'directory.png',
    laundry : 'laundry.png',
    library : 'library.png',
    map : 'map.png',
    news : 'feed.png',
    presentations : 'opencast.png',
    search : 'search.png',
    stats : 'stats.png',
    transit : 'transit.png',
    twitter : 'twitter.png',
    videos : 'youtube.png',
    weather : 'weather.png',
    info : 'default-icon.png'
};

config.nativeModules = {
    map : 'map.html'
};
