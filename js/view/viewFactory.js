"use strict";

(function (Notes) {
    Notes.view.viewFactory = function (options) {
        var that = {};

        var setTimeout = options.setTimeout;
        var clearTimeout = options.clearTimeout;

        var animations = options.animations;
        var viewUtilities = options.viewUtilities;

        var createAppView = options.createAppView;
        var createApplicationStatusView = options.createApplicationStatusView;
        var createBackToTopView = options.createBackToTopView;
        var createDeleteNoteActionView = options.createDeleteNoteActionView;
        var createEditorView = options.createEditorView;
        var createEditNoteActionView = options.createEditNoteActionView;
        var createLoadMoreNotesView = options.createLoadMoreNotesView;
        var createNewNoteActionView = options.createNewNoteActionView;
        var createNoteInputView = options.createNoteInputView;
        var createNoteListItemView = options.createNoteListItemView;
        var createNoteListView = options.createNoteListView;
        var createNoteStatusTextView = options.createNoteStatusTextView;
        var createTextView = options.createTextView;

        that.create = function (name, options) {
            var factoryOptions = {
                setTimeout: setTimeout,
                clearTimeout: clearTimeout,

                animations: animations,
                viewFactory: that,
                viewUtilities: viewUtilities
            };
            for (var property in options) {
                factoryOptions[property] = options[property];
            }

            switch (name) {
                case "App":
                    return createAppView(factoryOptions);
                case "ApplicationStatus":
                    return createApplicationStatusView(factoryOptions);
                case "BackToTop":
                    return createBackToTopView(factoryOptions);
                case "DeleteNoteAction":
                    return createDeleteNoteActionView(factoryOptions);
                case "EditNoteAction":
                    return createEditNoteActionView(factoryOptions);
                case "Editor":
                    return createEditorView(factoryOptions);
                case "LoadMoreNotes":
                    return createLoadMoreNotesView(factoryOptions);
                case "NewNoteAction":
                    return createNewNoteActionView(factoryOptions);
                case "NoteInput":
                    return createNoteInputView(factoryOptions);
                case "NoteList":
                    return createNoteListView(factoryOptions);
                case "NoteListItem":
                    return createNoteListItemView(factoryOptions);
                case "NoteStatusText":
                    return createNoteStatusTextView(factoryOptions);
                case "Text":
                    return createTextView(factoryOptions);
                default:
                    throw new Error("[ViewFactory] Missing case for view: " +
                        name);
            }
        };

        return that;
    };
})(Notes);
