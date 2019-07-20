"use strict";

(function (Notes) {
    Notes.viewModel.appViewModel = function (options) {
        var that = {};

        var viewModelFactory = options.viewModelFactory;

        var applicationStatusViewModel = viewModelFactory.create(
            "ApplicationStatus");
        that.getApplicationStatusViewModel = function () {
            return applicationStatusViewModel;
        };

        var editorViewModel = viewModelFactory.create("Editor");
        that.getEditorViewModel = function () { return editorViewModel; };

        var listViewModel = viewModelFactory.create("List");
        that.getListViewModel = function () { return listViewModel; };

        editorViewModel.onDeleteNote(function () {
            listViewModel.forceRefresh();
        });

        listViewModel.onDeleteNote(function () {
            editorViewModel.forceRefresh();
        });
        listViewModel.onEditNote(function () {
            editorViewModel.forceRefresh();
            that.notifyEditNoteListeners();
        });

        var editNoteListeners = [];

        that.onEditNote = function (newListenerCallback) {
            editNoteListeners.push(newListenerCallback);
        };
        that.offEditNode = function (listenerCallback) {
            var index = editNoteListeners.indexOf(listenerCallback);

            if (index === -1) {
                throw new Error("[AppViewModel]" + 
                    " Edit note listener has never been registered.");
            }

            editNoteListeners.splice(index, 1);
        };
        that.notifyEditNoteListeners = function () {
            editNoteListeners.forEach(function (listenerCallback) {
                listenerCallback();
            });
        };

        return that;
    };
})(Notes);
