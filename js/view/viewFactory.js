"use strict";

(function (Notes) {
    Notes.view.viewFactory = function (options) {
        var that = {};

        var createApplicationStatusView = options.createApplicationStatusView;
        var createDeleteNoteActionView = options.createDeleteNoteActionView;
        var createEditorView = options.createEditorView;
        var createNewNoteActionView = options.createNewNoteActionView;
        var createNoteDateView = options.createNoteDateView;
        var createNoteInputView = options.createNoteInputView;
        var createNoteStatusView = options.createNoteStatusView;

        that.create = function (name, options) {
            var view = null;

            switch (name) {
                case "ApplicationStatus":
                    view = createApplicationStatusView(options);
                    break;
                case "DeleteNoteAction":
                    view = createDeleteNoteActionView(options);
                    break;
                case "Editor":
                    view = createEditorView(options);
                    break;
                case "NewNoteAction":
                    view = createNewNoteActionView(options);
                    break;
                case "NoteDate":
                    view = createNoteDateView(options);
                    break;
                case "NoteInput":
                    view = createNoteInputView(options);
                    break;
                case "NoteStatus":
                    view = createNoteStatusView(options);
                    break;
                default:
                    throw new Error("ViewFactory: Missing case for view: " +
                        name);
            }

            return view;
        };

        return that;
    };
})(Notes);
