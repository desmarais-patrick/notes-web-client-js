"use strict";

(function (Notes) {
    Notes.model.model = function (options) {
        var that = {};

        var eventListeners = {
            "App.Status": []
        };

        var app = options.createApp();

        that.addEventListener = function (eventName, callback) {
            var activeListeners = eventListeners[eventName];
            if (!activeListeners) {
                throw new Error("Implementation error!" + 
                    "No listeners can be configured for event " + eventName);
            }
            if (activeListeners.indexOf(callback) !== -1) {
                throw new Error("Implementation error!" + 
                    "Listener already added for event " + eventName);
            }

            activeListeners.push(callback);
            notifyListeners(eventName, callback);
        };

        var notifyListeners = function (eventName, callback) {
            switch (eventName) {
                case "App.Status":
                    notifyAppStatus(callback);
                    break;
                default:
                    throw new Error("Implementation error!" + 
                        "Unconfigured event for notifications " + eventName);
            }
        };

        var notifyAppStatus = function (callback) {
            var notifyListener = function (listener) {
                var changeEvent = {
                    getSource: function () {
                        return app;
                    }
                };
                listener(changeEvent);
            };
            if (!callback) {
                var activeListeners = eventListeners[eventName];
                activeListeners.forEach(notifyListener);
            } else {
                notifyListener(callback);
            }
        }

        return that;
    };
})(Notes);
