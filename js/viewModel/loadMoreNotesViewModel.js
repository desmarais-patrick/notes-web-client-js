"use strict";

(function (Notes) {
    var EVENT_CHECK_TIMEOUT_MS = 750;
    Notes.viewModel.loadMoreNotesViewModel = function (options) {
        var that = {};

        // Member variables.
        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var model = options.model;

        var modelEventIterator = null;
        var modelEventCheckTimeoutId = null;

        var messageChangeListenerCallback = null;
        var stateChangeListenerCallback = null;
        var visibilityChangeListenerCallback = null;

        var hasMore = false;
        var isRequestInProgress = false;
        var message = null;

        // Member functions.
        that.initialize = function () {
            listenToModelEvents();
        };

        that.destroy = function () {
            stopListeningToModelEvents();
        };

        that.setMessageChangeListener = function (newListenerCallback) {
            messageChangeListenerCallback = newListenerCallback;
        };

        that.setStateChangeListener = function (newListenerCallback) {
            stateChangeListenerCallback = newListenerCallback;
        };

        that.setVisibilityChangeListener = function (newListenerCallback) {
            visibilityChangeListenerCallback = newListenerCallback;
        };

        that.isVisible = function () {
            var isVisible = (hasMore === true);
            return isVisible;
        };

        that.isEnabled = function () {
            var isEnabled = (isRequestInProgress === false);
            return isEnabled;
        };

        that.hasMessage = function () {
            var hasMessage = (message === null);
            return hasMessage;
        };

        that.getMessage = function () {
            if (message === null) {
                return "";
            }

            return message;
        };

        that.requestMoreNotes = function () {
            if (isRequestInProgress === true) {
                return;
            }

            setMessage(null);
            setIsRequestInProgress(true);
            model.requestMoreNotes(function (err) {
                if (err) {
                    setMessage("⚠️ Oops! Something went wrong.");
                }

                setIsRequestInProgress(false);
            });
        };

        var listenToModelEvents = function () {
            modelEventIterator = model.listen("change Notes.HasMore");
            checkModelEvents();
        };

        var checkModelEvents = function () {
            modelEventCheckTimeoutId = setTimeout(function () {
                // Skip to latest changes.
                var event = null;
                while (modelEventIterator.hasNext()) {
                    event = modelEventIterator.next();
                }

                // Update value if there was any event.
                if (event !== null) {
                    updateHasMoreValue(event.options.newHasMore);
                }

                // Continue listening to changes.
                checkModelEvents();
            }, EVENT_CHECK_TIMEOUT_MS);
        };

        var updateHasMoreValue = function (newValue) {
            if (hasMore !== newValue) {
                hasMore = newValue;
                notifyVisibilityChangeListener();
            }
        };

        var setIsRequestInProgress = function (newValue) {
            if (isRequestInProgress !== newValue) {
                isRequestInProgress = newValue;
                notifyStateChangeListener();
            }
        };

        var setMessage = function (newValue) {
            if (message !== newValue) {
                message = newValue;
                notifyMessageChangeListener();
            }
        };

        var notifyVisibilityChangeListener = function () {
            if (visibilityChangeListenerCallback !== null) {
                visibilityChangeListenerCallback();
            }
        };

        var notifyStateChangeListener = function () {
            if (stateChangeListenerCallback !== null) {
                stateChangeListenerCallback();
            }
        };

        var notifyMessageChangeListener = function () {
            if (messageChangeListenerCallback !== null) {
                messageChangeListenerCallback();
            }
        };

        var stopListeningToModelEvents = function () {
            if (modelEventCheckTimeoutId !== null) {
                clearTimeout(modelEventCheckTimeoutId);
                modelEventCheckTimeoutId = null;
            }
            modelEventIterator = null;
        };

        return that;
    };
})(Notes);
