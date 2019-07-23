"use strict";

(function (Notes) {
    Notes.designSystem.setupListItemsSection = function (createAppOptions) {
        var appOptions;
        var exampleRootNode;
        var viewUtilities;

        appOptions = createAppOptions();
        viewUtilities = appOptions.viewUtilities;
        exampleRootNode = viewUtilities.traversal
            .findWithId("listItems-initial-example");
        setupInitialExample(appOptions, exampleRootNode);
    };

    var setupInitialExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("NoteListItem");
        var view = appOptions.viewFactory.create("NoteListItem", {
            rootNode: rootNode,
            viewModel: viewModel,
        });
        view.render();
    };
})(Notes);
