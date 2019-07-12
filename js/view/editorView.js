"use strict";

(function (Notes) {
    Notes.view.editorView = function (options) {
        var that = {};

        var utilities = options.utilities;
        var rootNode = options.rootNode;

        var viewModel = options.viewModel;
        var viewFactory = options.viewFactory;

        var topDeleteRootNode = utilities.findChildNodeWithCssSelector(rootNode,
            ".editor-actions-top .editor-actions-delete");
        var topDeleteActionView = viewFactory.create("DeleteNoteAction", {
            rootNode: topDeleteRootNode,
            viewModel: viewModel
        });
        var bottomDeleteRootNode = utilities.findChildNodeWithCssSelector(
            rootNode, ".editor-actions-bottom .editor-actions-delete");
        var bottomDeleteActionView = viewFactory.create("DeleteNoteAction", {
            rootNode: bottomDeleteRootNode,
            viewModel: viewModel
        });

        var topNewRootNode = utilities.findChildNodeWithCssSelector(rootNode, 
            ".editor-actions-top .editor-actions-new");
        var topNewActionView = viewFactory("NewNoteAction", {
            rootNode: topNewRootNode,
            viewModel: viewModel
        });
        var bottomNewRootNode = utilities.findChildNodeWithCssSelector(rootNode, 
            ".editor-actions-bottom .editor-actions-new");
        var bottomNewActionView = viewFactory("NewNoteAction", {
            rootNode: bottomNewRootNode,
            viewModel: viewModel
        });

        var dateRootNode = utilities.findChildNodeWithCssSelector(rootNode,
            ".editor-date");
        var dateView = options.viewFactory("NoteDate", {
            rootNode: dateRootNode,
            viewModel: viewModel
        });

        var statusRootNode = utilities.findChildNodeWithCssSelector(rootNode,
            ".editor-status");
        var statusView = utilities.viewFactory("NoteStatus", {
            rootNode: statusRootNode,
            viewModel: viewModel
        });

        var inputRootNode = utilities.findChildNodeWithCssSelector(rootNode,
            ".editor-input");
        var inputView = utilities.viewFactory("NoteInput", {
            rootNode: inputRootNode,
            viewModel: viewModel
        });

        that.render = function () {
            topDeleteActionView.render();
            topNewActionView.render();
            dateView.render();
            statusView.render();
            inputView.render();
            bottomDeleteActionView.render();
            bottomNewActionView.render();
        };

        that.destroy = function () {
            topDeleteActionView.destroy();
            topNewActionView.destroy();
            dateView.destroy();
            statusView.destroy();
            inputView.destroy();
            bottomDeleteActionView.destroy();
            bottomDeleteActionView.destroy();
        };

        return that;
    };
})(Notes);
