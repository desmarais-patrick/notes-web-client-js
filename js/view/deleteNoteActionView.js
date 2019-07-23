"use strict";

(function (Notes) {
    Notes.view.deleteNoteActionView = function (options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewUtilities.text.set(rootNode, "Delete");
            viewUtilities.button.onClick(rootNode, onClicked);
        };

        var onClicked = function () {
            viewModel.deleteNote();
        };

        that.destroy = function () {
            viewUtilities.button.offClick(rootNode, onClicked);
        };

        return that;
    };
})(Notes);
