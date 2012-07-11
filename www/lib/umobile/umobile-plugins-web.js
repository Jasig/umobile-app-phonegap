// override the settings in config.js to provide mock data and mock login functionality
config.uMobileServerContext = "/test-data";
config.loginFn = "mockLogin";

// Mock in-memory implementation of the SessionTracking plugin
var SessionTracking = {
    time: 0,
    get: function (success, failure) {
        success(this.time);
    },
    set: function (time, success, failure) {
        this.time = time;
        if (success) {
            success(time);
        }
    }
};
