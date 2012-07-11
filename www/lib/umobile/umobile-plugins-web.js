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
