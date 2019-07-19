"use strict";

(function (Notes) {
    Notes.viewModel.noteInputViewModel = function (options) {
        var that = {};

        var model = options.model;
        var clientNoteId = null;

        // Note change events help notify views for:
        // - (Before event) last update before change
        // - (After event) set new text after change
        var beforeNoteChangeListeners = [];
        var afterNoteChangeListeners = [];

        // Note creation events help notify viewModels when starting a new note.
        var noteCreationListeners = [];

        that.getNoteText = function () {
            if (clientNoteId === null) {
                return null;
            }

            var note = model.getNoteByClientId(clientNoteId);
            return note.getText();
        };

        that.setNoteClientId = function (newClientNoteId) {
            notifyBeforeNoteChange();
            clientNoteId = newClientNoteId;
            notifyAfterNoteChange();
        };

        var notifyBeforeNoteChange = function () {
            var currentText = that.getNoteText();
            beforeNoteChangeListeners.forEach(function (listenerCallback) {
                listenerCallback(currentText);
            });
        };
        var notifyAfterNoteChange = function () {
            var newText = that.getNoteText();
            afterNoteChangeListeners.forEach(function (listenerCallback) {
                listenerCallback(newText);
            });
        };

        that.onBeforeNoteChange = function (newListenerCallback) {
            beforeNoteChangeListeners.push(newListenerCallback);
        };
        that.onAfterNoteChange = function (newListenerCallback) {
            afterNoteChangeListeners.push(newListenerCallback);
        };

        that.offBeforeNoteChange = function (listenerCallback) {
            offEvent("Before note change", beforeNoteChangeListeners,
                listenerCallback);
        };
        that.offAfterNoteChange = function (listenerCallback) {
            offEvent("After note change", afterNoteChangeListeners,
                listenerCallback);
        };

        that.saveInputText = function (newText) {
            if (clientNoteId === null) {
                var newNote = model.createNote(newText);
                clientNoteId = newNote.getClientId();
                notifyNoteCreated();
            } else {
                var note = model.getNoteByClientId(clientNoteId);
                model.updateNote(note, newText);
            }
        };

        that.onNoteCreation = function (newListenerCallback) {
            noteCreationListeners.push(newListenerCallback);
        };

        that.offNoteCreation = function (listenerCallback) {
            offEvent("Create note", noteCreationListeners, listenerCallback);
        };

        var notifyNoteCreated = function () {
            noteCreationListeners.forEach(function (listenerCallback) {
                listenerCallback(clientNoteId);
            });
        };

        var offEvent = function (eventName, listeners, listenerCallback) {
            var index = listeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[NoteInputViewModel]" + 
                    " " + eventName + " listener has never been registered.");
            }

            listeners.splice(index, 1);
        };

        return that;
    };
})(Notes);
