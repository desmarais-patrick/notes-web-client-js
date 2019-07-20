"use strict";

(function (Notes) {
    var STATUS_CHECK_INTERVAL_MS = 300;

    Notes.viewModel.listItemViewModel = function (options) {
        var that = {};

        var setInterval = options.setInterval;
        var clearInterval = options.clearInterval;

        var NOTE_STATUS_ENUM = options.NOTE_STATUS_ENUM;

        var noteClientId = null;

        var dateViewModel = options.viewModelFactory.create("NoteDate");
        that.getDateViewModel = function () {
            return dateViewModel;
        };

        var textStartViewModel = options.viewModelFactory.create(
            "NoteTextStart");
        that.getTextStartViewModel = function () {
            return textStartViewModel;
        };

        var linesCountViewModel = options.viewModelFactory.create(
            "NoteLinesCount");
        that.getLinesCountViewModel = function () {
            return linesCountViewModel;
        };

        that.setNote = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(noteClientId);
            textStartViewModel.setNoteClientId(noteClientId);
            linesCountViewModel.setNoteClientId(noteClientId);
        };

        // onNoteSelected
        // offNoteSelected

        // onNoteUnselected
        // offNoteUnselected

        that.select = function () {
            // notifyNoteSelected
        };
        that.unSelect = function () {
            // notifyNoteUnselected
        };

        // onDeleteNote
        // offDeleteNote

        that.deleteNote = function () {
            var note = model.getNoteByClientId(noteClientId);
            model.deleteNote(note);

            // notifyNoteDeleted.
        };

        // onEditNote
        // offEditNote

        that.editNote = function () {
            // notifyEditNote. // Bubble up edit request.
        };

        return that;
    };
})(Notes);
