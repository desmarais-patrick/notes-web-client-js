"use strict";

(function (Notes) {
    Notes.viewModel.noteDateViewModel = function (options) {
        var that = {};

        // Member variables.
        var dateUtilities = options.dateUtilities;

        var model = options.model;

        var date = null;
        var changeListenerCallback = null;

        // Member functions.
        that.initialize = function () {

        };
        that.destroy = function () {
            
        };

        that.getText = function () {
            if (date === null) {
                return "";
            }

            return dateUtilities.format(date);
        };

        that.setChangeListener = function (newListenerCallback) {
            changeListenerCallback = newListenerCallback;
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

            if (changeListenerCallback !== null) {
                var dateText = that.getText();
                changeListenerCallback(dateText);
            }
        };

        return that;
    };
})(Notes);
