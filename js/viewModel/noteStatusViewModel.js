"use strict";

(function (Notes) {
    var STATUS_CHECK_INTERVAL_MS = 300;

    Notes.viewModel.noteStatusViewModel = function (options) {
        var that = {};

        var model = options.model;

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;
        var statusCheckIntervalId = null;

        var statusChangeEventIterator = null;
        var changeListeners = [];

        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;
        var status = null;

        that.getStatusText = function () {
            if (status === null) {
                return "";
            }

            var statusText;
            if (status === NOTE_STATUS_ENUM.READY) {
                statusText = "Autosaved ✓";
            } else if (status === NOTE_STATUS_ENUM.LOADING) {
                statusText = "Saving...";
            } else if (status === NOTE_STATUS_ENUM.FAILED_TO_SYNC) {
                statusText = "Failed to sync :(";
            } else {
                statusText = "Failed to load note :s";
            }

            return statusText;
        };

        that.onChange = function (newListenerCallback) {
            changeListeners.push(newListenerCallback);
        };

        that.offChange = function (listenerCallback) {
            var index = changeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[NoteStatusViewModel]" + 
                    " Change listener has never been registered.");
            }

            changeListeners.splice(index, 1);
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
         
            notifyChange();
        };

        var stopListeningForModelEvents = function () {
            if (statusCheckIntervalId !== null) {
                clearInterval(statusCheckIntervalId);
            }
            statusChangeEventIterator = null;
        };

        var startListeningForModelEvents = function (clientId) {
            var eventName = "change Notes[" + clientId + "].Status";
            statusChangeEventIterator = model.listen(eventName);
            statusCheckIntervalId = setInterval(function () {
                if (statusChangeEventIterator.hasNext()) {
                    var event = statusChangeEventIterator.next();
                    status = event.options.newStatus;
                    notifyChange();
                }
            }, STATUS_CHECK_INTERVAL_MS);
        };

        var notifyChange = function () {
            var newText = that.getStatusText();
            changeListeners.forEach(function (listener) {
                listener(newText);
            });
        };

        return that;
    };
})(Notes);
