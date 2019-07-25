"use strict";

(function (Notes) {
    Notes.viewModel.noteListItemViewModel = function (options) {
        var that = {};

        // Member variables.
        var noteClientId = null;
        var isSelected = false;

        var textStartViewModel = options.viewModelFactory.create(
            "NoteTextStart");
        var linesCountViewModel = options.viewModelFactory.create(
            "NoteLinesCount");
        var dateViewModel = options.viewModelFactory.create("NoteDate");
        var statusViewModel = options.viewModelFactory.create("NoteStatus");

        // Member functions.
        that.getTextStartViewModel = function () {
            return textStartViewModel;
        };
        that.getLinesCountViewModel = function () {
            return linesCountViewModel;
        };
        that.getDateViewModel = function () {
            return dateViewModel;
        };
        that.getStatusViewModel = function () {
            return statusViewModel;
        };

        that.isSelected = function () {
            return isSelected;
        };
        that.toggleSelected = function () {
            that.setIsSelected(!isSelected);
        };
        that.setIsSelected = function (newValue) {
            isSelected = newValue;
            notifyListeners("IsSelected", newValue);
        };
        that.onIsSelectedChange = function (listenerCallback) {
            addListenerCallback("IsSelected", listenerCallback);
        };
        that.offIsSelectedChange = function (listenerCallback) {
            removeListenerCallback("IsSelected", listenerCallback);
        };

        that.setNoteClientId = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(noteClientId);
            textStartViewModel.setNoteClientId(noteClientId);
            linesCountViewModel.setNoteClientId(noteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
        };

        that.deleteNote = function () {
            var note = model.getNoteByClientId(noteClientId);
            model.deleteNote(note);

            notifyListeners("DeleteNote", noteClientId);
        };
        that.onDeleteNote = function (listenerCallback) {
            addListenerCallback("DeleteNote", listenerCallback);
        };
        that.offDeleteNote = function (listenerCallback) {
            removeListenerCallback("DeleteNote", listenerCallback);
        };

        that.editNote = function () {
            notifyListeners("EditNote", noteClientId);
        };
        that.onEditNote = function (listenerCallback) {
            addListenerCallback("EditNote", listenerCallback);
        };
        that.offEditNote = function (listenerCallback) {
            removeListenerCallback("EditNote", listenerCallback);
        };

        var listeners = {
            "DeleteNote": [],
            "EditNote": [],
            "IsSelected": []
        };

        var addListenerCallback = function (name, callback) {
            var callbacks = listeners[name];
            if (callbacks.indexOf(callback) >= 0) {
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
