"use strict";

(function (Notes) {
    Notes.viewModel.editorViewModel = function (options) {
        var that = {};

        // Member variables.
        var model = options.model;

        var viewModelEvents = options.viewModelEvents;

        var noteClientId = null;

        var dateViewModel = null;
        var statusViewModel = null;
        var noteInputViewModel = null;

        var viewModelEvents = options.viewModelEvents;

        // Member functions.
        that.initialize = function () {
            dateViewModel = options.viewModelFactory.create("NoteDate");
            dateViewModel.initialize();
            statusViewModel = options.viewModelFactory.create("NoteStatus");
            statusViewModel.initialize();
            noteInputViewModel = options.viewModelFactory.create("NoteInput");
            noteInputViewModel.initialize();

            viewModelEvents.on("DeleteNote", onDeleteNote);
            viewModelEvents.on("NewNoteCreated", onNewNoteCreated);
            viewModelEvents.on("EditNote", onEditNote);
        };

        that.destroy = function () {
            dateViewModel.destroy();
            statusViewModel.destroy();
            noteInputViewModel.destroy();

            viewModelEvents.off("DeleteNote", onDeleteNote);
            viewModelEvents.off("NewNoteCreated", onNewNoteCreated);
            viewModelEvents.off("EditNote", onEditNote);
        };

        that.getDateViewModel = function () {
            return dateViewModel;
        };
        that.getStatusViewModel = function () {
            return statusViewModel;
        };
        that.getInputViewModel = function () {
            return noteInputViewModel;
        };

        var onDeleteNote = function (deletedNoteClientId) {
            if (noteClientId === deletedNoteClientId) {
                clearEditor();
            }
        };

        var onNewNoteCreated = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(newNoteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
        };

        var onEditNote = function (noteClientId) {
            that.setNote(noteClientId);
        };

        that.startNewNote = function () {
            if (noteClientId === null) {
                return;
            }

            clearEditor();
        };

        that.deleteNote = function () {
            if (noteClientId === null) {
                return;
            }

            var note = model.getNoteByClientId(noteClientId);
            model.deleteNote(note);

            viewModelEvents.notify("DeleteNote", noteClientId);
            clearEditor();
        };

        var clearEditor = function () {
            that.setNote(null);
        };

        that.setNote = function (newNoteClientId) {
            if (noteClientId === newNoteClientId) {
                return;
            }

            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(newNoteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
            noteInputViewModel.setNoteClientId(newNoteClientId);
        };

        return that;
    };
})(Notes);
