var SessionTracking = {
    get: function (success, failure) {
        return cordova.exec(success, failure, "SessionTracking", "get", []);
    },
    set: function (time, success, failure) {
        return cordova.exec(success, failure, "SessionTracking", "set", [time]);
    }
};
