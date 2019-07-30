"use strict";

(function (Notes) {
    // Setup.
    var chosenConfiguration = Notes.config.configurations["Development"];

    var reqBuilderOptions = {
        XMLHttpRequest: window.XMLHttpRequest,
        requestTimeoutInMillis: 30000,

        request: Notes.communication.request,
        baseUrl: chosenConfiguration.apiServerBaseUrl
    };
    var requestBuilder = Notes.communication.requestBuilder(reqBuilderOptions);

    var modelOptions = {
        createApp: Notes.model.app,
        createCache: Notes.model.cache,
        createEvents: Notes.model.events,
        createNote: Notes.model.note,
        NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,
        createNotes: Notes.model.notes,
        NOTES_STATUS_ENUM: Notes.model.notes.STATUS_ENUM,
        requestBuilder: requestBuilder,
        setTimeout: window.setTimeout
    };
    var model = Notes.model.model(modelOptions);

    var dateUtilities = Notes.utilities.dateUtilities();
    var listUtilities = Notes.utilities.listUtilities();

    var viewUtilities = Notes.utilities.viewUtilities({
        document: window.document,
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

    var rootNode = viewUtilities.traversal.findWithId("app");
    var viewModel = viewModelFactory.create("App");
    viewModel.initialize();
    var view = viewFactory.create("App", {
        viewModel: viewModel,
        rootNode: rootNode
    });

    // Display page when document is ready.
    var isDocumentReady = function () {
        var state = document.readyState;
        // TODO Review what interactive and complete mean.
        return (state === "interactive" || state === "complete");
    };
    if (isDocumentReady()) {
        view.render();
    } else {
        document.onreadystatechange = function () {
            if (isDocumentReady()) {
                view.render();
                document.onreadystatechange = null; // Render only once.
            }
        };
    }

    // Show has started!
    console.log("Hello from Notes app!");
    console.log("Mode:", chosenConfiguration.name);

})(Notes);
