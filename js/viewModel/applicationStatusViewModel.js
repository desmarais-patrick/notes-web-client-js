"use strict";

(function (Notes) {
    Notes.viewModel.applicationStatusViewModel = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var model = options.model;
        var APP_STATUS_ENUM = options.APP_STATUS_ENUM;

        var appStatusEventIterator = model.listen("change App.Status");
        var appStatusListener = null;

        that.onAppStatusChange = function (callback) {
            appStatusListener = callback;
        };

        var intervalId = setInterval(function () {
            if (appStatusEventIterator.hasNext()) {
                appStatusEventIterator.next();
                appStatusListener && appStatusListener();
            }
        }, 400);

        that.destroy = function () {
            clearInterval(intervalId);
        };

        var INITIAL_TEXT = "Welcome!";
        var WORKING_TEXT = "App is working...";
        var READY_TEXT = "App ready";

        that.getText = function () {
            var app = model.getApp();
            var appStatus = app.getStatus();

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
