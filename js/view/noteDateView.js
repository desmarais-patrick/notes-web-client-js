"use strict";

(function (Notes) {
    Notes.view.dateView = function () {
        var that = {};

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        // Add listener to note's id since date doesn't change after created.

        that.render = function () {
            // Display based on whether it's a note that was created (has a date, non-null).
            // Use viewModel's format.
        };

        that.destroy = function () {
            // Nothing special to do.
        };

        return that;
    };
})(Notes);
