"use strict";

(function (Notes) {
    Notes.view.newNoteActionView = function () {
        var that = {};

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            // add onclick listener
            // disable button if already a new, empty note: new-ability.
        };

        var onClick = function () {
            // tell viewModel to start a new note
            // disable and wait for feedback to re-enable.
        };

        that.destroy = function () {
            // remove onclick listener
        };

        return that;
    };
})(Notes);
