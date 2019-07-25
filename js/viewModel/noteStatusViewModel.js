"use strict";

(function (Notes) {
    var STATUS_CHECK_INTERVAL_MS = 300;

    Notes.viewModel.noteStatusViewModel = function (options) {
        var that = {};

        // Member variables.
        var model = options.model;

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;
        var statusCheckTimeoutId = null;

        var statusChangeEventIterator = null;
        var changeListenerCallback = null;

        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;
        var status = null;

        // Member functions.
        that.initialize = function () {

        };

        that.destroy = function () {
            stopListeningForModelEvents();
        };

        that.getStatusText = function () {
            if (status === null) {
                return "";
            }

            var statusText = "Unknown";
            if (status === NOTE_STATUS_ENUM.READY) {
                statusText = "Autosaved ✓";
            } else if (status === NOTE_STATUS_ENUM.LOADING) {
                statusText = "Saving...";
            } else if (status === NOTE_STATUS_ENUM.FAILED_TO_SYNC) {
                statusText = "Failed to sync :(";
            } else if (status === NOTE_STATUS_ENUM.FAILED_TO_LOAD) {
                statusText = "Failed to load note :s";
            }

            return statusText;
        };

        that.getStatus = function () {
            var statusObj = {};

            statusObj.text = that.getStatusText();

            statusObj.isReady = function () {
                return (status === NOTE_STATUS_ENUM.READY);
            };
            statusObj.isLoading = function () {
                return (status === NOTE_STATUS_ENUM.LOADING);
            };
            statusObj.isFailedToSync = function () {
                return (status === NOTE_STATUS_ENUM.FAILED_TO_SYNC);
            };
            statusObj.isFailedToLoad = function () {
                return (status === NOTE_STATUS_ENUM.FAILED_TO_LOAD);
            };

            return statusObj;
        };

        that.setChangeListener = function (newListenerCallback) {
            changeListenerCallback = newListenerCallback;
        };

        that.setNoteClientId = function (newNoteClientId) {
            stopListeningForModelEvents();

            if (newNoteClientId === null) {
                status = null;
            } else {
                startListeningForModelEvents(newNoteClientId);

                var newNote = model.getNoteByClientId(newNoteClientId);
                status = newNote.getStatus();
            }
         
            if (changeListenerCallback !== null) {
                var statusObj = that.getStatus();
                changeListenerCallback(statusObj);
            }
        };

        var stopListeningForModelEvents = function () {
            if (statusCheckTimeoutId !== null) {
                clearTimeout(statusCheckTimeoutId);
            }
            statusChangeEventIterator = null;
        };

        var startListeningForModelEvents = function (clientId) {
            var eventName = "change Notes[" + clientId + "].Status";
            statusChangeEventIterator = model.listen(eventName);
            listenToModelEvents(eventName);
        };

        var listenToModelEvents = function (eventName) {
            statusCheckTimeoutId = setTimeout(function () {
                if (statusChangeEventIterator.hasNext()) {
                    var event = statusChangeEventIterator.next();
                    status = event.options.newStatus;
                    if (changeListenerCallback !== null) {
                        var statusObj = that.getStatus();
                        changeListenerCallback(statusObj);
                    }
                }
                listenToModelEvents(eventName);
            }, STATUS_CHECK_INTERVAL_MS);
        };

        return that;
    };
})(Notes);
