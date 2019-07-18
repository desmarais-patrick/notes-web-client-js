"use strict";

(function (Notes) {
    Notes.view.editorView = function (options) {
        var that = {};

        var utils = options.viewUtilities;
        var rootNode = options.rootNode;

        var viewModel = options.viewModel;
        var viewFactory = options.viewFactory;

        var topDeleteRootNode = utils.traversal.findWithCssSelector(rootNode,
            ".editor-actions-top .editor-actions-delete");
        var topDeleteActionView = viewFactory.create("DeleteNoteAction", {
            rootNode: topDeleteRootNode,
            viewModel: viewModel
        });
        var bottomDeleteRootNode = utils.traversal.findWithCssSelector(
            rootNode, ".editor-actions-bottom .editor-actions-delete");
        var bottomDeleteActionView = viewFactory.create("DeleteNoteAction", {
            rootNode: bottomDeleteRootNode,
            viewModel: viewModel
        });

        var topNewRootNode = utils.traversal.findWithCssSelector(rootNode, 
            ".editor-actions-top .editor-actions-new");
        var topNewActionView = viewFactory.create("NewNoteAction", {
            rootNode: topNewRootNode,
            viewModel: viewModel
        });
        var bottomNewRootNode = utils.traversal.findWithCssSelector(rootNode, 
            ".editor-actions-bottom .editor-actions-new");
        var bottomNewActionView = viewFactory.create("NewNoteAction", {
            rootNode: bottomNewRootNode,
            viewModel: viewModel
        });

        var dateRootNode = utils.traversal.findWithCssSelector(rootNode,
            ".editor-date");
        var dateView = viewFactory.create("NoteDate", {
            rootNode: dateRootNode,
            viewModel: viewModel
        });

        var statusRootNode = utils.traversal.findWithCssSelector(rootNode,
            ".editor-status");
        var statusView = viewFactory.create("NoteStatus", {
            rootNode: statusRootNode,
            viewModel: viewModel
        });

        var inputRootNode = utils.traversal.findWithCssSelector(rootNode,
            ".editor-input");
        var inputView = viewFactory.create("NoteInput", {
            rootNode: inputRootNode,
            viewModel: viewModel
        });

        var editorContainerNode = utils.traversal.findWithCssClass(rootNode, 
            "editor-container");

        that.render = function () {
            topDeleteActionView.render();
            topNewActionView.render();
            dateView.render();
            statusView.render();
            inputView.render();
            bottomDeleteActionView.render();
            bottomNewActionView.render();

            utils.div.onClick(editorContainerNode, onEditorClicked);
        };

        var onEditorClicked = function () {
            inputView.focus();
        };

        that.destroy = function () {
            topDeleteActionView.destroy();
            topNewActionView.destroy();
            dateView.destroy();
            statusView.destroy();
            inputView.destroy();
            bottomDeleteActionView.destroy();
            bottomDeleteActionView.destroy();

            utils.div.offClick(editorContainerNode, onEditorClicked);
        };

        return that;
    };
})(Notes);
