"use strict";

(function (Notes) {
    Notes.designSystem.setupEditorSection = function (createAppOptions) {
        var appOptions;
        var exampleRootNode;

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("initial-editor-example");
        setupInitialExample(appOptions, exampleRootNode);

        appOptions = createAppOptions();
        exampleRootNode = appOptions.viewUtilities.traversal
            .findWithId("editor-example-one-sentence");
        setupOneSentenceExample(appOptions, exampleRootNode);
    };

    var setupInitialExample = function (appOptions, exampleRootNode) {
        var viewModel = appOptions.viewModelFactory.create("Editor");
        var view = appOptions.viewFactory.create("Editor", {
            rootNode: exampleRootNode,
            viewModel: viewModel
        });

        view.render();

        // Leave empty.
    };

    var setupOneSentenceExample = function (appOptions, exampleRootNode) {
        var viewModel = appOptions.viewModelFactory.create("Editor");
        var view = appOptions.viewFactory.create("Editor", {
            rootNode: exampleRootNode,
            viewModel: viewModel
        });

        view.render();

        // Create note that will be displayed in editor.
        appOptions.requestBuilderMock
            .setNextPostResponseAsNoteCreatedWithId(1);
        appOptions.model.createNote("TED talk, Shawn Achor, Happiness", 
            function () {
                viewModel.setNote(1);
            });
    };
})(Notes);
