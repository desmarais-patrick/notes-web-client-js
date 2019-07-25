"use strict";

(function (Notes) {
    Notes.viewModel.noteInputViewModel = function (options) {
        var that = {};

        // Member variables.
        var model = options.model;
        var viewModelEvents = options.viewModelEvents;

        var clientNoteId = null;
        
        var beforeNoteChangeListenerCallback = null;
        var afterNoteChangeListenerCallback = null;

        // Member functions.
        that.initialize = function () { };
        that.destroy = function () { };

        that.getNoteText = function () {
            if (clientNoteId === null) {
                return null;
            }

            var note = model.getNoteByClientId(clientNoteId);
            return note.getText();
        };

        that.setNoteClientId = function (newClientNoteId) {
            if (beforeNoteChangeListenerCallback !== null) {
                var currentText = this.getNoteText();
                beforeNoteChangeListenerCallback(currentText);
            }

            clientNoteId = newClientNoteId;

            if (afterNoteChangeListenerCallback !== null) {
                var newText = this.getNoteText();
                afterNoteChangeListenerCallback(newText);
            }
        };

        that.setBeforeNoteChangeListener = function (newListenerCallback) {
            beforeNoteChangeListenerCallback = newListenerCallback;
        };

        that.setAfterNoteChangeListener = function (newListenerCallback) {
            afterNoteChangeListenerCallback = newListenerCallback;
        };

        that.saveInputText = function (newText) {
            if (clientNoteId === null) {
                var newNote = model.createNote(newText);
                clientNoteId = newNote.getClientId();
                    // Don't trigger note change listeners to avoid 
                    // interrupting view;
                    // This is a subtle note creation, only when input. ;)
                viewModelEvents.notify("NewNoteCreated", clientNoteId);
            } else {
                var note = model.getNoteByClientId(clientNoteId);
                model.updateNote(note, newText);
            }
        };

        return that;
    };
})(Notes);
