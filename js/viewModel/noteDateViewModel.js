"use strict";

(function (Notes) {
    Notes.viewModel.noteDateViewModel = function (options) {
        var that = {};

        var dateUtilities = options.dateUtilities;

        var model = options.model;

        var changeListeners = [];
        var date = null;

        that.getDateText = function () {
            if (date === null) {
                return "";
            }

            return dateUtilities.format(date);
        };

        that.onChange = function (newListenerCallback) {
            changeListeners.push(newListenerCallback);
        };

        that.offChange = function (listenerCallback) {
            var index = changeListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[NoteDateViewModel]" + 
                    " Change listener has never been registered.");
            }

            changeListeners.splice(index, 1);
        };

        // Only used by parent view model when note changes.
        // This is instead of adding a listener to a note's date property,
        // since it only changes when the note is set.
        that.setNoteClientId = function (newNoteClientId) {
            if (newNoteClientId === null) {
                date = null;
            } else {
                var newNote = model.getNoteByClientId(newNoteClientId);
                date = newNote.getDate();
            }

            notifyChange();
        };

        var notifyChange = function () {
            var dateText = that.getDateText();
            changeListeners.forEach(function (listener) {
                listener(dateText);
            });
        };

        return that;
    };
})(Notes);
