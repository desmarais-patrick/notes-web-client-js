"use strict";

(function (Notes) {
    Notes.viewModel.appViewModel = function (options) {
        var that = {};

        // Member variables.
        var viewModelFactory = options.viewModelFactory;

        var viewModelEvents = options.viewModelEvents;

        var appStatusViewModel = null;
        var editorViewModel = null;
        var listViewModel = null;

        var editNoteListenerCallback = null;

        // Member functions.
        that.initialize = function () {
            appStatusViewModel = viewModelFactory.create("ApplicationStatus");
            appStatusViewModel.initialize();

            editorViewModel = viewModelFactory.create("Editor");
            editorViewModel.initialize();

            listViewModel = viewModelFactory.create("List");
            listViewModel.initialize();

            viewModelEvents.on("EditNote", onEditNote);
        };

        that.destroy = function () {
            appStatusViewModel.destroy();
            editorViewModel.destroy();
            listViewModel.destroy();

            viewModelEvents.off("EditNote", onEditNote);
        };

        that.getAppStatusViewModel = function () {
            return appStatusViewModel;
        };
        that.getEditorViewModel = function () {
            return editorViewModel;
        };
        that.getListViewModel = function () {
            return listViewModel;
        };

        that.setEditNoteListener = function (newListenerCallback) {
            editNoteListenerCallback = newListenerCallback;
        };

        var onEditNote = function () {
            if (editNoteListenerCallback !== null) {
                editNoteListenerCallback();
            }
        };

        return that;
    };
})(Notes);
