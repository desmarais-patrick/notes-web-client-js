"use strict";

(function (Notes) {
    var APP_STATUS_ENUM = {
        UNKNOWN: "Unknown",
        INITIALIZING: "Initializing",
        READY: "Ready",
        WORKING: "Working"
    }; // (!) Hopefully, nobody changes that object. :s

    Notes.model.app = function (options) {
        var that = {};

        var defaultStatus = APP_STATUS_ENUM.UNKNOWN;
        var status = defaultStatus;

        var changeEventBuilder = options.changeEventBuilder;
        var changeEventListeners = [];

        that.addChangeEventListener = function (listenerCallback) {
            if (changeEventListeners.indexOf(listenerCallback) !== -1) {
                throw new Error("Implementation error!" + 
                    "Listener already added for change events on App.");
            }

            changeEventListeners.push(listenerCallback);

            var changeEvent = changeEventBuilder.createChangeEvent(this);
            listenerCallback(changeEvent);
        };

        that.removeChangeEventListener = function (listenerCallback) {
            var index = changeEventListeners.indexOf(listenerCallback);
            if (index === -1) {
                throw new Error("Implementation error!" + 
                    "Listener never registered for change events on App.");
            }

            changeEventListeners.splice(index, 1);
        };

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
                this.notifyListeners();
            }
        };

        var isEnumValue = function (value) {
            var key = Object.keys(APP_STATUS_ENUM).find(function (key, index, array) {
                return (value === array[key]);
            });
            return (key !== null);
        };

        that.notifyListeners = function () {
            var changeEvent = changeEventBuilder.createChangeEvent(this);
            changeEventListeners.forEach(function (listenerCallback) {
                listenerCallback(changeEvent);
            });
        };

        return that;
    };
    Notes.model.app.APP_STATUS_ENUM = APP_STATUS_ENUM;
})(Notes);
