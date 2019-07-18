"use strict";

(function (Notes) {
    var STATUS_CHECK_INTERVAL_MS = 300;

    Notes.viewModel.editorViewModel = function (options) {
        var that = {};

        var model = options.model;

        var currentNote = null;

        var dateViewModel = options.viewModelFactory.create("NoteDate");
        that.getDateViewModel = function () {
            return dateViewModel;
        };

        var statusViewModel = options.viewModelFactory.create("NoteStatus");
        that.getStatusViewModel = function () {
            return statusViewModel;
        };

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

        that.saveAndClear = function () {
            if (currentNote === null) {
                // Nothing to save and already cleared, ignore.
                return;
            }

            // Save is already driven by autosave in inputView.
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

        that.clearEditor = function () {
            if (currentNote === null) {
                // Nothing to clear.
                return;
            }

            currentNote = null;
            dateViewModel.onNoteChanged(null);
            statusViewModel.onNoteChanged(null);

            // Note cleanup.
            this.notifyNoteReplaced(null);
        };

        that.saveText = function (newText) {
            if (currentNote === null) {
                var newNote = model.createNote(newText);
                setCurrentNote(newNote);
            } else {
                model.updateNote(currentNote, newText);
            }
        };

        that.setNote = function (noteClientId) {
            var note = model.getNoteByClientId(noteClientId);
            setCurrentNote(note);
            that.notifyNoteReplaced(currentNote);
        };

        var setCurrentNote = function (note) {
            currentNote = note;
            dateViewModel.onNoteChanged(note);
            statusViewModel.onNoteChanged(note);
        };

        that.notifyNoteReplaced = function (newNote) {
            noteReplacedListeners.forEach(function (listener) {
                listener(newNote);
            });
        };

        return that;
    };
})(Notes);
