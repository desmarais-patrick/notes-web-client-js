"use strict";

(function (Notes) {
    var STATUS_ENUM = {
        UNKNOWN: "Unknown",
        INITIALIZING: "Initializing",
        READY: "Ready",
        WORKING: "Working"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.app = function app(options) {
        var that = {};

        var events = options.events;

        var editorNoteClientId = null;

        var defaultStatus = STATUS_ENUM.UNKNOWN;
        var status = options.status || defaultStatus;

        that.getEditorNoteClientId = function () {
            return editorNoteClientId;
        };

        that.getStatus = function () {
            return status;
        };
        that.setStatus = function (newStatus) {
            if (isEnumValue(newStatus) === false) {
                throw new Error("Implementation error! " + 
                    newStatus + " is not value part of STATUS_ENUM.");
            }

            if (newStatus !== status) {
                status = newStatus;
                events.dispatch("change App.Status", "new value", {
                    newStatus: newStatus
                });
            }
        };

        var isEnumValue = function (value) {
            var key = Object.keys(STATUS_ENUM).find(function (key, index, array) {
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
    Notes.model.app.STATUS_ENUM = STATUS_ENUM;
})(Notes);
