"use strict";

(function (Notes) {
    Notes.viewModel.events = function () {
        var that = {};

        var listeners = {};

        that.on = function (name, callback) {
            var callbacks = listeners[name];

            if (typeof callbacks === "undefined") { // TODO Review if a register() function may be more efficient.
                listeners[name] = callbacks = [];
            }

            if (callbacks.indexOf(callback) >= 0) { // For debugging.
                throw new Error("[ViewModel.Events] Listener already " + 
                    "registered for " + name);
            }

            callbacks.push(callback);
        };

        that.off = function (name, callback) {
            var callbacks = listeners[name];

            if (typeof callbacks === "undefined") { // For debugging.
                throw new Error("[ViewModel.Events] No listeners for " + name);
            }

            var index = callbacks.indexOf(callback);
            if (index === -1) { // For debugging.
                throw new Error("[ListItemViewMode] Listener not registered" +
                    " for " + name);
            }

            callbacks.splice(index, 1);
        };

        that.notify = function (name, options) {
            var callbacks = listeners[name];

            if (typeof callbacks === "undefined") {
                // No listeners yet for this event.
                return;
            }

            callbacks.forEach(function (callback) {
                callback(options);
            });
        };

        return that;
    };
})(Notes);
