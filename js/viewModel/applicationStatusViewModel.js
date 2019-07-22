"use strict";

(function (Notes) {
    var REFRESH_TIMING_MS = 400;

    Notes.viewModel.applicationStatusViewModel = function (options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var model = options.model;
        var APP_STATUS_ENUM = options.APP_STATUS_ENUM;

        var appStatusListenerCallback = null;
        that.setAppStatusChangeListener = function (callback) {
            appStatusListenerCallback = callback;
        };

        var appStatusEventIterator = model.listen("change App.Status");
        var appStatusCheckTimeoutId = null;
        var listenToModelEvents = function () {
            appStatusCheckTimeoutId = setTimeout(function () {
                if (appStatusEventIterator.hasNext()) {
                    var event = appStatusEventIterator.next();
                    notifyAppStatusListener(event.options.newStatus);
                }
                listenToModelEvents();
            }, REFRESH_TIMING_MS);
        };

        listenToModelEvents();

        that.destroy = function () {
            stopListeningToModelEvents();
        };

        var notifyAppStatusListener = function (newStatus) {
            if (appStatusListenerCallback !== null) {
                var text = formatStatusText(newStatus);
                appStatusListenerCallback(text);
            }
        };

        var stopListeningToModelEvents = function () {
            clearTimeout(appStatusCheckTimeoutId);
            appStatusListenerCallback = null;
        };

        var INITIAL_TEXT = "Welcome!";
        var WORKING_TEXT = "App is working...";
        var READY_TEXT = "App ready";

        that.getText = function () {
            var app = model.getApp();
            var appStatus = app.getStatus();
            return formatStatusText(appStatus);
        };

        var formatStatusText = function (appStatus) {
            if (APP_STATUS_ENUM.WORKING === appStatus) {
                return WORKING_TEXT;
            } else if (APP_STATUS_ENUM.READY === appStatus) {
                return READY_TEXT;
            }

            return INITIAL_TEXT;
        };

        return that;
    };
})(Notes);
