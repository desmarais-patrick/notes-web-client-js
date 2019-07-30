"use strict";

(function (Notes) {
    var REFRESH_TIMING_MS = 400;

    Notes.viewModel.backToTopViewModel = function (options) {
        var that = {};

        // Member variables.
        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var model = options.model;

        var isVisible = false;
        var visibilityListenerCallback = null;

        var listChangeEventIterator = null;
        var refreshTimeoutId = null;

        // Member functions.
        that.initialize = function () {
            listChangeEventIterator = model.listen("change Notes.List");
            listenToModelEvents();
        };

        that.destroy = function () {
            stopListeningToModelEvents();
        };

        that.isVisible = function () {
            return isVisible;
        };

        that.setVisibilityChangeListener = function (callback) {
            visibilityListenerCallback = callback;
        };

        var listenToModelEvents = function () {
            refreshTimeoutId = setTimeout(function () {
                if (listChangeEventIterator.hasNext()) {
                    var event = listChangeEventIterator.next();
                    var newList = event.options.newList;
                    var newValue = newList.length > 3;
                    setIsVisible(newValue);
                }
                listenToModelEvents();
            }, REFRESH_TIMING_MS);
        };

        var stopListeningToModelEvents = function () {
            clearTimeout(refreshTimeoutId);
            visibilityListenerCallback = null;
        };

        var setIsVisible = function (newValue) {
            if (isVisible !== newValue) {
                isVisible = newValue;
                notifyVisibilityListener(isVisible);
            }
        };

        var notifyVisibilityListener = function (newValue) {
            if (visibilityListenerCallback !== null) {
                visibilityListenerCallback(newValue);
            }
        };

        return that;
    };
})(Notes);
