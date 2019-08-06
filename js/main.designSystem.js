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
        Notes.designSystem.setupListSection(createAppOptions);
        Notes.designSystem.setupListItemsSection(createAppOptions);
        Notes.designSystem.setupBackToTopSection(createAppOptions);
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
        var listUtilities = Notes.utilities.listUtilities();

        var viewUtilities = Notes.utilities.viewUtilities({
            document: window.document,
            window: window,
        });

        var animations = Notes.view.animations({
            setTimeout: window.setTimeout,
            viewUtilities: viewUtilities,
        });

        var viewModelEvents = Notes.viewModel.events();

        var viewModelFactory = Notes.viewModel.viewModelFactory({
            setTimeout: window.setTimeout,
            clearTimeout: window.clearTimeout,

            dateUtilities: dateUtilities,
            listUtilities: listUtilities,
            
            model: model,
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,

            viewModelEvents: viewModelEvents,

            createAppViewModel: Notes.viewModel.appViewModel,
            createApplicationStatusViewModel:
                Notes.viewModel.applicationStatusViewModel,
            createBackToTopViewModel: Notes.viewModel.backToTopViewModel,
            createEditorViewModel: Notes.viewModel.editorViewModel,
            createLoadMoreNotesViewModel:
                Notes.viewModel.loadMoreNotesViewModel,
            createNoteDateViewModel: Notes.viewModel.noteDateViewModel,
            createNoteInputViewModel: Notes.viewModel.noteInputViewModel,
            createNoteLinesCountViewModel:
                Notes.viewModel.noteLinesCountViewModel,
            createNoteListItemViewModel: Notes.viewModel.noteListItemViewModel,
            createNoteListViewModel: Notes.viewModel.noteListViewModel,
            createNoteStatusViewModel: Notes.viewModel.noteStatusViewModel,
            createNoteTextStartViewModel: Notes.viewModel.noteTextStartViewModel,
        });

        var viewFactory = Notes.view.viewFactory({
            setTimeout: window.setTimeout,
            clearTimeout: window.clearTimeout,

            animations: animations,
            viewUtilities: viewUtilities,

            createAppView: Notes.view.appView,
            createApplicationStatusView: Notes.view.applicationStatusView,
            createBackToTopView: Notes.view.backToTopView,
            createDeleteNoteActionView: Notes.view.deleteNoteActionView,
            createEditNoteActionView: Notes.view.editNoteActionView,
            createEditorView: Notes.view.editorView,
            createLoadMoreNotesView: Notes.view.loadMoreNotesView,
            createNewNoteActionView: Notes.view.newNoteActionView,
            createNoteInputView: Notes.view.noteInputView,
            createNoteListItemView: Notes.view.noteListItemView,
            createNoteListView: Notes.view.noteListView,
            createNoteStatusTextView: Notes.view.noteStatusTextView,
            createTextView: Notes.view.textView,
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
