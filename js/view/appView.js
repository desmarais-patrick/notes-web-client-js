"use strict";

(function (Notes) {
    // TODO Integrate in index.html.
    Notes.view.appView = function(options) {
        var that = {};

        var viewFactory = options.viewFactory;
        var viewUtilities = options.viewUtilities;

        var rootNode = options.rootNode;
        var viewModel = options.viewModel;

        var editorRootNode = null;

        var appStatusView = null;
        var editorView = null;
        var listView = null;
        var backToTopView = null;

        that.render = function () {
            var appStatusRootNode = viewUtilities.traversal.findWithCssSelector(
                rootNode, ".application-status");
            appStatusView = viewFactory.create("ApplicationStatus", {
                rootNode: appStatusRootNode,
                viewModel: viewModel.getAppStatusViewModel()
            });
            appStatusView.render();
    
            editorRootNode = viewUtilities.traversal.findWithCssSelector(
                rootNode, ".editor");
            editorView = viewFactory.create("Editor", {
                rootNode: editorRootNode,
                viewModel: viewModel.getEditorViewModel()
            });
            editorView.render();
    
            var listRootNode = viewUtilities.traversal.findWithCssSelector(
                rootNode, ".list");
            listView = viewFactory.create("NoteList", {
                rootNode: listRootNode,
                viewModel: viewModel.getListViewModel()
            });
            listView.render();
    
            var backToTopRootNode = viewUtilities.traversal.findWithCssSelector(
                rootNode, ".back-to-top");
            backToTopView = viewFactory.create("BackToTop", {
                rootNode: backToTopRootNode,
                viewModel: viewModel.getBackToTopViewModel()
            });
            backToTopView.render();

            viewModel.setEditNoteListener(focusOnEditor);
        };

        that.destroy = function () {
            viewModel.setEditNoteListener(null);

            backToTopView.destroy();
            listView.destroy();
            editorView.destroy();
            appStatusView.destroy();
        };

        var focusOnEditor = function () {
            viewUtilities.scroll.toNode(editorRootNode, function () {
                editorView.focus();
            });
        };

        return that;
    };
})(Notes);
