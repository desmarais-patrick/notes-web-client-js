"use strict";

(function (Notes) {
    Notes.viewModel.editorViewModel = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;

        var dateUtilities = options.dateUtilities;
        var model = options.model;

        var currentNote = null;

        // Date
        var dateChangeListeners = [];

        that.getDateText = function () {
            if (currentNote === null) {
                return "";
            }
             
            var date = currentNote.getDate();
            return dateUtilities.format(date);
        };

        that.onDateChange = function (newListenerCallback) {
            dateChangeListeners.push(newListenerCallback);
        };

        that.offDateChange = function (listenerCallback) {
            var index = dateChangeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[EditorViewModel] Programmatical error!" + 
                    " This date change listener has never been registered.");
            }

            dateChangeListeners.splice(index, 1);
        };

        that.notifyDateChange = function (newDate) {
            var formattedDateText = dateUtilities.format(newDate);
            dateChangeListeners.forEach(function (listener) {
                listener(formattedDateText);
            });
        };

        // Status
        var statusChangeEventIterator = null;
        var statusCheckIntervalId = null;

        var statusChangeListeners = [];

        that.getStatusText = function () {
            if (currentNote === null) {
                return "";
            }

            var status = currentNote.getStatus();
            return translateStatusText(status);
        };

        that.onStatusChange = function (newListenerCallback) {
            statusChangeListeners.push(newListenerCallback);
        };

        that.offStatusChange = function (listenerCallback) {
            var index = statusChangeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[EditorViewModel] Programmatical error!" + 
                    " This status change listener has never been registered.");
            }

            statusChangeListeners.splice(index, 1);
        };

        that.notifyStatusChange = function (newStatus) {
            var text = translateStatusText(newStatus);
            statusChangeListeners.forEach(function (listener) {
                listener(text);
            });
        };

        var translateStatusText = function (status) {
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

        // Initialization
        that.setNote = function (noteClientId) {
            var note = model.getNoteByClientId(noteClientId);
            currentNote = note;

            // Date setup.
            var date = currentNote.getDate();
            this.notifyDateChange(date);

            // Status hook setup.
            if (statusCheckIntervalId !== null) {
                clearInterval(statusCheckIntervalId);
            }
            var clientId = currentNote.getClientId();
            var eventName = "change Notes[" + clientId + "].Status";
            statusChangeEventIterator = model.listen(eventName);
            setInterval(function () {
                if (statusChangeEventIterator.hasNext()) {
                    var event = statusChangeEventIterator.next();
                    that.notifyStatusChange(event.options.newStatus);
                }
            }, 300);
            var status = currentNote.getStatus();
            this.notifyStatusChange(status);
        };

        that.clearEditor = function () {
            if (currentNote === null) {
                // Nothing to clear.
                return;
            }

            currentNote = null;

            // Date cleanup.
            this.notifyDateChange(null);

            // Status hook cleanup.
            statusChangeEventIterator = null;
            if (statusCheckIntervalId !== null) {
                clearInterval(statusCheckIntervalId);
            }
            this.notifyStatusChange(null);
        };

        return that;
    };
})(Notes);
