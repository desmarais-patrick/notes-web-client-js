"use strict";

(function (Notes) {
    Notes.view.editNoteActionView = function (options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        that.render = function () {
            viewUtilities.button.onClick(rootNode, onClicked);
        };

        var onClicked = function () {
            viewModel.editNote();
        };

        that.destroy = function () {
            viewUtilities.button.offClick(rootNode, onClicked);
        };

        return that;
    };
})(Notes);
