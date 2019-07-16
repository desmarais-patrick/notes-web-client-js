"use strict";

(function (Notes) {
    Notes.view.viewFactory = function (options) {
        var that = {};

        var animations = options.animations;
        var viewUtilities = options.viewUtilities;

        var createApplicationStatusView = options.createApplicationStatusView;
        var createDeleteNoteActionView = options.createDeleteNoteActionView;
        var createEditorView = options.createEditorView;
        var createNewNoteActionView = options.createNewNoteActionView;
        var createNoteDateView = options.createNoteDateView;
        var createNoteInputView = options.createNoteInputView;
        var createNoteStatusView = options.createNoteStatusView;

        that.create = function (name, options) {
            var view = null;

            var factoryOptions = {
                animations: animations,
                viewFactory: that,
                viewUtilities: viewUtilities
            };
            for (var property in options) {
                factoryOptions[property] = options[property];
            }

            switch (name) {
                case "ApplicationStatus":
                    view = createApplicationStatusView(factoryOptions);
                    break;
                case "DeleteNoteAction":
                    view = createDeleteNoteActionView(factoryOptions);
                    break;
                case "Editor":
                    view = createEditorView(factoryOptions);
                    break;
                case "NewNoteAction":
                    view = createNewNoteActionView(factoryOptions);
                    break;
                case "NoteDate":
                    view = createNoteDateView(factoryOptions);
                    break;
                case "NoteInput":
                    view = createNoteInputView(factoryOptions);
                    break;
                case "NoteStatus":
                    view = createNoteStatusView(factoryOptions);
                    break;
                default:
                    throw new Error("[ViewFactory] Missing case for view: " +
                        name);
            }

            return view;
        };

        return that;
    };
})(Notes);
