"use strict";

(function () {

    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            main();
            document.onreadystatechange = null; // Render only once.
        }
    };

    var main = function () {
        var designSystemOptions = {
            createAnimations: createAnimations,
            createDateUtilities: Notes.utilities.dateUtilities,
            createModel: createModel,
            createViewModelFactory: createViewModelFactory,
            createViewFactory: createViewFactory,
            createViewUtilities: createViewUtilities,
        };

        Notes.designSystem.setupAnimationSection(designSystemOptions);
        Notes.designSystem.setupApplicationStatusSection(designSystemOptions);
        Notes.designSystem.setupEditorSection(designSystemOptions);
    };

    var createAnimations = function (viewUtilities) {
        return Notes.view.animations({
            setTimeout: window.setTimeout,
            viewUtilities: viewUtilities,
        });
    };

    var createModel = function () {
        return Notes.model.model({
            createApp: Notes.model.app,
            createCache: Notes.model.cache,
            createEvents: Notes.model.events,
            createNote: Notes.model.note,
            NOTE_STATUS_ENUM: Notes.model.note.STATUS_ENUM,
            createNotes: Notes.model.notes,
            NOTES_STATUS_ENUM: Notes.model.notes.STATUS_ENUM,
            requestBuilder: null,
            setTimeout: window.setTimeout
        });
    };

    var createViewModelFactory = function (model, dateUtilities) {
        return Notes.viewModel.viewModelFactory({
            setInterval: window.setInterval,
            clearInterval: window.clearInterval,
            createApplicationStatusViewModel:
                Notes.viewModel.applicationStatusViewModel,
            APP_STATUS_ENUM: Notes.model.app.STATUS_ENUM,
            createEditorViewModel: Notes.viewModel.editorViewModel,
            model: model,
            dateUtilities: dateUtilities,
        });
    };

    var createViewFactory = function () {
        return Notes.view.viewFactory({
            createApplicationStatusView: Notes.view.applicationStatusView,
            createDeleteNoteActionView: Notes.view.deleteNoteActionView,
            createEditorView: Notes.view.editorView,
            createNewNoteActionView: Notes.view.newNoteActionView,
            createNoteDateView: Notes.view.noteDateView,
            createNoteInputView: Notes.view.noteInputView,
            createNoteStatusView: Notes.view.noteStatusView,
        });
    };

    var createViewUtilities = function () {
        return Notes.utilities.viewUtilities({
            document: window.document,
        });
    }
})(Notes);
