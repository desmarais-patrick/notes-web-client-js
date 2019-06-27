"use strict";

(function (Notes) {
    var APP_STATUS_ENUM = {
        UNKNOWN: "Unknown",
        INITIALIZING: "Initializing",
        READY: "Ready",
        WORKING: "Working"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.app = function app(options) {
        var that = {};

        var events = options.events;

        var defaultStatus = APP_STATUS_ENUM.UNKNOWN;
        var status = options.status || defaultStatus;

        that.getStatus = function () {
            return status;
        };
        that.setStatus = function (newStatus) {
            if (!isEnumValue(newStatus)) {
                    throw new Error("Implementation error! " + 
                    newStatus + " is not value part of APP_STATUS_ENUM.");
            }

            if (newStatus !== status) {
                status = newStatus;
                events.dispatch("change App.Status", "new value", 
                    {source: this.clone()});
            }
        };

        var isEnumValue = function (value) {
            var key = Object.keys(APP_STATUS_ENUM).find(function (key, index, array) {
                return (value === array[key]);
            });
            return (key !== null);
        };

        that.clone = function () {
            return app({
                events: events,
                status: status
            });
        };

        return that;
    };
    Notes.model.app.APP_STATUS_ENUM = APP_STATUS_ENUM;
})(Notes);
