"use strict";

(function (Notes) {
    var STATUS_CHECK_INTERVAL_MS = 300;

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

        // General note changes.
        var noteReplacedListeners = [];

        that.onReplaceNote = function (newListenerCallback) {
            noteReplacedListeners.push(newListenerCallback);
        };

        that.offReplaceNote = function (listenerCallback) {
            var index = noteReplacedListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[EditorViewModel] Programmatical error!" + 
                    " This note change listener has never been registered.");
            }

            noteReplacedListeners.splice(index, 1);
        };

        that.notifyNoteReplaced = function (newNote) {
            noteReplacedListeners.forEach(function (listener) {
                listener(newNote);
            });
        };

        // Mutation.
        that.saveText = function (newText) {
            if (currentNote === null) {
                var newNote = model.createNote(newText);
                setCurrentNote(newNote);
            } else {
                model.updateNote(currentNote, newText);
            }
        };

        that.saveAndClear = function () {
            if (currentNote === null) {
                // Nothing to save and already cleared, ignore.
                return;
            }

            // Save is already handled by input.
            this.clearEditor();
        };

        that.deleteAndClear = function () {
            if (currentNote === null) {
                // Nothing to delete and already cleared, ignore.
                return;
            }

            model.deleteNote(currentNote);
            this.clearEditor();
        };

        // Initialization
        that.setNote = function (noteClientId) {
            var note = model.getNoteByClientId(noteClientId);
            setCurrentNote(note);
            that.notifyNoteReplaced(currentNote);
        };

        var setCurrentNote = function (note) {
            currentNote = note;

            // Date setup.
            var date = currentNote.getDate();
            that.notifyDateChange(date);

            // Status hook setup.
            if (statusCheckIntervalId !== null) {
                clearInterval(statusCheckIntervalId);
            }
            var clientId = currentNote.getClientId();
            var eventName = "change Notes[" + clientId + "].Status";
            statusChangeEventIterator = model.listen(eventName);
            statusCheckIntervalId = setInterval(function () {
                if (statusChangeEventIterator.hasNext()) {
                    var event = statusChangeEventIterator.next();
                    that.notifyStatusChange(event.options.newStatus);
                }
            }, STATUS_CHECK_INTERVAL_MS);
            var status = currentNote.getStatus();
            that.notifyStatusChange(status);
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
            if (statusCheckIntervalId !== null) {
                clearInterval(statusCheckIntervalId);
            }
            statusChangeEventIterator = null;
            this.notifyStatusChange(null);

            // Note cleanup.
            this.notifyNoteReplaced(null);
        };

        return that;
    };
})(Notes);
