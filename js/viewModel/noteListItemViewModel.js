"use strict";

(function (Notes) {
    Notes.viewModel.noteListItemViewModel = function (options) {
        var that = {};

        // Member variables.
        var model = options.model;
        var viewModelEvents = options.viewModelEvents;

        var noteClientId = null;
        var isSelected = false;

        var textStartViewModel = null;
        var linesCountViewModel = null;
        var dateViewModel = null;
        var statusViewModel = null;

        var selectedListenerCallback = null;

        // Member functions.
        that.initialize = function () {
            textStartViewModel = options.viewModelFactory.create(
                "NoteTextStart");
            textStartViewModel.initialize();

            linesCountViewModel = options.viewModelFactory.create(
                "NoteLinesCount");
            linesCountViewModel.initialize();

            dateViewModel = options.viewModelFactory.create("NoteDate");
            dateViewModel.initialize();

            statusViewModel = options.viewModelFactory.create("NoteStatus");
            statusViewModel.initialize();
        };

        that.destroy = function () {
            textStartViewModel.destroy();
            linesCountViewModel.destroy();
            dateViewModel.destroy();
            statusViewModel.destroy();
        };

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
            if (isSelected === newValue) {
                return;
            }

            isSelected = newValue;
            if (selectedListenerCallback !== null) {
                selectedListenerCallback(newValue);
            }

            if (isSelected) {
                viewModelEvents.notify("SelectNote", noteClientId);
            }
        };
        that.setSelectedListener = function (newListenerCallback) {
            selectedListenerCallback = newListenerCallback;
        };

        that.setNoteClientId = function (newNoteClientId) {
            noteClientId = newNoteClientId;
            dateViewModel.setNoteClientId(noteClientId);
            textStartViewModel.setNoteClientId(noteClientId);
            linesCountViewModel.setNoteClientId(noteClientId);
            statusViewModel.setNoteClientId(newNoteClientId);
            this.setIsSelected(false);
        };

        that.deleteNote = function () {
            if (noteClientId === null) {
                return;
            }

            var note = model.getNoteByClientId(noteClientId);
            model.deleteNote(note);

            viewModelEvents.notify("DeleteNote", noteClientId);
        };

        that.editNote = function () {
            viewModelEvents.notify("EditNote", noteClientId);
        };

        return that;
    };
})(Notes);
