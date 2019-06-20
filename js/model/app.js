"use strict";

(function (Notes) {
    var APP_STATUS_ENUM = {
        UNKNOWN: "Unknown",
        INITIALIZING: "Initializing",
        READY: "Ready",
        WORKING: "Working"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.APP_STATUS_ENUM = APP_STATUS_ENUM;
    Notes.model.app = function () {
        var that = {};

        var defaultStatus = APP_STATUS_ENUM.UNKNOWN;
        var status = defaultStatus;

        // TODO Add changeListener or readyListener here!
        //      Or put this logic in Model.

        that.getStatus = function () {
            return status;
        };
        that.setStatus = function (newStatus) {
            // (!) Hopefully, it's one of APP_STATUS_ENUM. :s
            status = newStatus;
        };

        return that;
    };
})(Notes);
