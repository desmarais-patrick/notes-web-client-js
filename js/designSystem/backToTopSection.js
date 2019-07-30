"use strict";

(function (Notes) {
    Notes.designSystem.setupBackToTopSection = function (
        createAppOptions) {

        var appOptions;
        var exampleRootNode;

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("backToTop-initial-example");
        setupInitialExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("backToTop-withNotes-example");
        setupWithNotesExample(appOptions, exampleRootNode);
    };

    var setupInitialExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("BackToTop");
        var view = appOptions.viewFactory.create("BackToTop", {
            viewModel: viewModel,
            rootNode: rootNode,
        });
        view.render();

        // Leave initial.
    };

    var setupWithNotesExample = function (appOptions, rootNode) {
        var viewModel = appOptions.viewModelFactory.create("BackToTop");
        viewModel.initialize();
        var view = appOptions.viewFactory.create("BackToTop", {
            viewModel: viewModel,
            rootNode: rootNode,
        });
        view.render();

        // Add a few notes for back-to-top to appear.
        appOptions.requestBuilderMock
            .setNextPostResponseAsOfflineError();
        var model = appOptions.model;
        model.createNote("Note test 1");
        model.createNote("Note test 2");
        model.createNote("Note test 3");
        model.createNote("Note test 4");
    };
})(Notes);
