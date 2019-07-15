"use strict";

(function (Notes) {
    Notes.viewModel.editorViewModel = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var dateUtilities = options.dateUtilities;
        var model = options.model;

        var currentNote = null;

        // Status
        var statusChangeEventIterator = null;
        var statusCheckIntervalId = null;

        // Date
        var dateChangeListeners = [];

        that.getDateText = function () {
            if (currentNote !== null) {
                var date = currentNote.getDate();
                return dateUtilities.format(date);
            }

            return "";
        };

        that.onDateChange = function (newDateChangeListener) {
            dateChangeListeners.push(newDateChangeListener);
        };

        that.offDateChange = function (dateChangeListener) {
            var index = dateChangeListeners.indexOf(dateChangeListener);

            if (index === -1) {
                throw new Error("[EditorViewModel] Programmatical error!" + 
                    " This listener has never been registered.");
            }

            dateChangeListeners.splice(index, 1);
        };

        that.notifyDateChange = function (newDate) {
            var formattedDateText = dateUtilities.format(newDate);
            dateChangeListeners.forEach(function (listener) {
                listener(formattedDateText);
            });
        };

        // Initialization
        that.setEditorNote = function (note) {
            currentNote = note;

            // Date setup.
            this.notifyDateChange(note.getDate());

            // Status hook setup.
            if (statusCheckIntervalId !== null) {
                clearInterval(statusCheckIntervalId);
            }
            statusChangeEventIterator = model.listen("change Note[" + currentNote.getClientID() + "].Status");
            setInterval(function () {
                if (statusChangeEventIterator.hasNext()) {
                    var event = statusChangeEventIterator.next();
                    this.notifyStatusChange(event.source.newStatus);
                }
            }, 300);
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
        };

        return that;
    };
})(Notes);
