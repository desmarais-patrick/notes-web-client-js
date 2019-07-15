"use strict";

(function (Notes) {
    Notes.view.noteStatusView = function (options) {
        var that = {};

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        // Listen to the note's status and synchronized values (viewModel).
        // Listen to the viewModel's status change.

        that.render = function () {
            // Handle displayed or not based on whether there is any status.
            // Display status text.
        };

        that.destroy = function () {
            // offstatus change.
        };

        return that;
    };
})(Notes);
