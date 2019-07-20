"use strict";

(function () {

    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            main();
            document.onreadystatechange = null; // Render only once.
        }
    };

    var main = function () {
        Notes.designSystem.setupAnimationSection(createAppOptions);
        Notes.designSystem.setupApplicationStatusSection(createAppOptions);
        Notes.designSystem.setupEditorSection(createAppOptions);
    };

    var createAppOptions = function () {
        var requestBuilderMock = Notes.test.mocks.requestBuilderMock();

        var model = Notes.model.model({
            createApp: Notes.model.app,
            createCache: Notes.model.cache,
            createEvents: Notes.model.events,
            createNote: Notes.model.note,
            NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,
            createNotes: Notes.model.notes,
            NOTES_STATUS_ENUM: Notes.model.notes.STATUS_ENUM,
            requestBuilder: requestBuilderMock,
            setTimeout: window.setTimeout
        });

        var dateUtilities = Notes.utilities.dateUtilities();

        var viewUtilities = Notes.utilities.viewUtilities({
            document: window.document,
        });

        var animations = Notes.view.animations({
            setTimeout: window.setTimeout,
            viewUtilities: viewUtilities,
        });

        var viewModelFactory = Notes.viewModel.viewModelFactory({
            setInterval: window.setInterval,
            clearInterval: window.clearInterval,

            dateUtilities: dateUtilities,
            
            model: model,
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,

            createAppViewModel: Notes.viewModel.appViewModel,
            createApplicationStatusViewModel:
                Notes.viewModel.applicationStatusViewModel,
            createEditorViewModel: Notes.viewModel.editorViewModel,
            createListViewModel: Notes.viewModel.listViewModel,
            createListItemViewModel: Notes.viewModel.listItemViewModel,
            createNoteDateViewModel: Notes.viewModel.noteDateViewModel,
            createNoteInputViewModel: Notes.viewModel.noteInputViewModel,
            createNoteStatusViewModel: Notes.viewModel.noteStatusViewModel,
        });

        var viewFactory = Notes.view.viewFactory({
            setTimeout: window.setTimeout,
            clearTimeout: window.clearTimeout,

            animations: animations,
            viewUtilities: viewUtilities,

            createAppView: Notes.view.appView,
            createApplicationStatusView: Notes.view.applicationStatusView,
            createDeleteNoteActionView: Notes.view.deleteNoteActionView,
            createEditNoteActionView: Notes.view.editNoteActionView,
            createEditorView: Notes.view.editorView,
            createListView: Notes.view.listView,
            createNewNoteActionView: Notes.view.newNoteActionView,
            createNoteDateView: Notes.view.noteDateView,
            createNoteInputView: Notes.view.noteInputView,
            createNoteStatusView: Notes.view.noteStatusView,
        });

        return {
            animations: animations,
            dateUtilities: dateUtilities,
            model: model,
            requestBuilderMock: requestBuilderMock,
            viewFactory: viewFactory,
            viewModelFactory: viewModelFactory,
            viewUtilities: viewUtilities,
        };
    };
})(Notes);
