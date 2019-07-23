"use strict";

(function (Notes) {
    Notes.viewModel.editorViewModel = function (options) {
        var that = {};

        var model = options.model;

        var noteClientId = null;

        var dateViewModel = options.viewModelFactory.create("NoteDate");
        that.getDateViewModel = function () {
            return dateViewModel;
        };

        var statusViewModel = options.viewModelFactory.create("NoteStatus");
        that.getStatusViewModel = function () {
            return statusViewModel;
        };

        var noteInputViewModel = options.viewModelFactory.create("NoteInput");
        that.getInputViewModel = function () {
            return noteInputViewModel;
        };

        var onNoteCreatedByInput = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(newNoteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
        };
        noteInputViewModel.onNoteCreation(onNoteCreatedByInput);

        // TODO Listen to IsDeleted on note to clear editor when deleted.

        that.startNewNote = function () {
            if (noteClientId === null) {
                // No change.
                return;
            }

            that.setNote(null);
        };

        that.deleteNote = function () {
            if (noteClientId === null) {
                return;
            }

            var note = model.getNoteByClientId(noteClientId);
            model.deleteNote(note);

            that.setNote(null);
        };

        that.setNote = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(newNoteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
            noteInputViewModel.setNoteClientId(newNoteClientId);
        };

        return that;
    };
})(Notes);
