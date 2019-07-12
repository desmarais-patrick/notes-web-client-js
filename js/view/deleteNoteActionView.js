"use strict";

(function (Notes) {
    Notes.view.deleteNoteActionView = function () {
        var that = {};

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            // onclick listener to button.
            // disable button based upon delete-ability: non-null, non-empty note.
        };

        var onClick = function () {
            // Schedule delete in a few seconds.
            // Display a new note.
            // Add undo to delete, or confirmation.
        };

        that.destroy = function () {
            // offclick listener to button.
        };

        return that;
    };
})(Notes);
