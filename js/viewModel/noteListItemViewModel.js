"use strict";

(function (Notes) {
    Notes.viewModel.noteListItemViewModel = function (options) {
        var that = {};

        var noteClientId = null;
        var isSelected = false;

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

        var statusViewModel = options.viewModelFactory.create("NoteStatus");
        that.getStatusViewModel = function () {
            return statusViewModel;
        };

        that.isSelected = function () {
            return isSelected;
        };
        that.setIsSelected = function (newValue) {
            isSelected = newValue;
        };

        that.setNote = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(noteClientId);
            textStartViewModel.setNoteClientId(noteClientId);
            linesCountViewModel.setNoteClientId(noteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
        };

        that.onNoteSelected = function (listenerCallback) {
            addListenerCallback("NoteSelected", listenerCallback);
        };
        that.offNoteSelected = function (listenerCallback) {
            removeListenerCallback("NoteSelected", listenerCallback);
        };
        that.noteSelected = function () {
            notifyListeners("NoteSelected", noteClientId);
        };

        that.onNoteUnselected = function (listenerCallback) {
            addListenerCallback("NoteUnselected", listenerCallback);
        };
        that.offNoteUnselected = function (listenerCallback) {
            removeListenerCallback("NoteUnselected", listenerCallback);
        };
        that.noteUnselected = function () {
            notifyListeners("NoteUnselected", noteClientId);
        };

        that.onDeleteNote = function (listenerCallback) {
            addListenerCallback("DeleteNote", listenerCallback);
        };
        that.offDeleteNote = function (listenerCallback) {
            removeListenerCallback("DeleteNote", listenerCallback);
        };
        that.deleteNote = function () {
            var note = model.getNoteByClientId(noteClientId);
            model.deleteNote(note);

            notifyListeners("DeleteNote", noteClientId);
        };

        that.onEditNote = function (listenerCallback) {
            addListenerCallback("EditNote", listenerCallback);
        };
        that.offEditNote = function (listenerCallback) {
            removeListenerCallback("EditNote", listenerCallback);
        };
        that.editNote = function () {
            notifyListeners("EditNote", noteClientId);
        };

        var listeners = {
            "DeleteNote": [],
            "EditNote": [],
            "NoteSelected": [],
            "NoteUnselected": []
        };

        var addListenerCallback = function (name, callback) {
            var callbacks = listeners[name];
            if (callbacks.indexOf(callback) !== -1) {
                throw new Error("[ListItemViewModel] Listener already " + 
                    "registered for " + name);
            }
            callbacks.push(callback);
        };

        var removeListenerCallback = function (name, callback) {
            var callbacks = listeners[name];
            var index = callbacks.indexOf(callback);

            if (index === -1) {
                throw new Error("[ListItemViewMode] Listener not registered" +
                    " for " + name);
            }

            callbacks.splice(index, 1);
        };

        var notifyListeners = function (name, valueToPassOn) {
            var callbacks = listeners[name];
            callbacks.forEach(function (callback) {
                callback(valueToPassOn);
            });
        };

        return that;
    };
})(Notes);
