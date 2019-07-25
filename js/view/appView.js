"use strict";

(function (Notes) {
    // TODO Integrate in index.html.
    Notes.view.appView = function(options) {
        var that = {};

        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var appStatusRootNode = viewUtilities.traversal.findWithCssSelector(
            rootNode, ".application-status");
        var appStatusView = viewFactory.create("ApplicationStatus", {
            rootNode: appStatusRootNode,
            viewModel: viewModel.getApplicationStatusViewModel()
        });

        var editorRootNote = viewUtilities.traversal.findWithCssSelector(
            rootNode, ".editor");
        var editorView = viewFactory.create("Editor", {
            rootNode: editorRootNote,
            viewModel: viewModel.getEditorViewModel()
        });

        var listRootNode = viewUtilities.traversal.findWithCssSelector(
            rootNode, ".list");
        var listView = viewFactory.create("NoteList", {
            rootNode: listRootNode,
            viewModel: viewModel.getListViewModel()
        });

        that.render = function () {
            appStatusView.render();
            editorView.render();
            listView.render();

            viewModel.setEditNoteListener(focusOnEditor);
        };

        that.destroy = function () {
            viewModel.setEditNoteListener(null);

            appStatusView.destroy();
            editorView.destroy();
            listView.destroy();
        };

        var focusOnEditor = function () {
            viewUtilities.scroll.toNode(editorRootNote, function () {
                editorView.focus();
            });
        };

        return that;
    };
})(Notes);
